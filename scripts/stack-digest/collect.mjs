import {readFile, rename, unlink, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

const DATA_FILE = resolve('data/stack-digest.json');
const REPO_NAME = /^[\w.-]+\/[\w.-]+$/;

function isValidRepoName(name) {
  return typeof name === 'string' && REPO_NAME.test(name) && name.split('/').every(part => part !== '.' && part !== '..');
}

export function isValidRepo(repo) {
  if (!Number.isSafeInteger(repo.id) || !isValidRepoName(repo.full_name) || typeof repo.html_url !== 'string') return false;
  try {
    const url = new URL(repo.html_url);
    return url.protocol === 'https:' && url.hostname === 'github.com' && !url.port && !url.username && !url.password && !url.search && !url.hash && url.pathname.replace(/\/$/, '').toLowerCase() === `/${repo.full_name}`.toLowerCase();
  } catch {
    return false;
  }
}

function normalizeName(value) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/^https?:\/\/(?:www\.)?github\.com\//i, '').replace(/\/+$/, '').replace(/\.git$/i, '').toLowerCase();
}

export function isDuplicate(data, repo) {
  const candidate = normalizeName(repo.full_name);
  const url = normalizeName(repo.html_url);
  return data.posts.some(post =>
    (repo.id && post.repoId && repo.id === post.repoId) ||
    (candidate && normalizeName(post.repoName) === candidate) ||
    (url && normalizeName(post.githubUrl) === url)
  ) || data.seen.some(entry => candidate && normalizeName(entry.repoFullName) === candidate);
}

export function remainingToday(data, today, limit) {
  return Math.max(0, limit - data.posts.filter(post => post.collectedOn === today).length);
}

export function parseTrending(html) {
  const scripts = html.matchAll(/<script\b(?=[^>]*\btype\s*=\s*["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script\s*>/gi);
  let list;
  for (const match of scripts) {
    let value;
    try { value = JSON.parse(match[1]); } catch { continue; }
    const candidates = Array.isArray(value) ? value : [value, ...(value['@graph'] || [])];
    list = candidates.find(item => item?.['@type'] === 'ItemList' || item?.['@type']?.includes?.('ItemList'));
    if (list) break;
  }
  if (!list || !Array.isArray(list.itemListElement)) throw new Error('Trendshift ItemList not found');
  if (!list.itemListElement.length) throw new Error('Trendshift ItemList is empty');
  const result = list.itemListElement.map((element, index) => ({
    name: element?.item?.name,
    trendshiftUrl: element?.item?.url,
    position: Number(element?.position) || index + 1,
  })).filter(repo => isValidRepoName(repo.name));
  if (!result.length) throw new Error('Trendshift ItemList contains no valid repositories');
  return result.sort((a, b) => a.position - b.position);
}

export function findReadmeImage(readme, repoName, branch) {
  const matches = readme.matchAll(/!\[[^\]]*\]\(([^\s)]+)(?:\s+[^)]*)?\)|<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi);
  for (const match of matches) {
    const source = (match[1] || match[2]).replace(/^<|>$/g, '').replaceAll('&amp;', '&');
    if (/badge|shield|\.svg(?:[?#]|$)/i.test(source)) continue;
    try {
      const root = `https://raw.githubusercontent.com/${repoName}/${encodeURIComponent(branch)}/`;
      let url = new URL(source, root);
      const githubPrefix = `/${repoName}/raw/`.toLowerCase();
      if (url.hostname === 'github.com' && url.pathname.toLowerCase().startsWith(githubPrefix)) {
        url = new URL(`https://raw.githubusercontent.com/${url.pathname.slice(1)}${url.search}`);
      }
      if (url.protocol === 'https:' && url.hostname === 'raw.githubusercontent.com' && url.pathname.toLowerCase().startsWith(`/${repoName}/`.toLowerCase())) return url.href;
    } catch { /* Invalid image references are ignored. */ }
  }
  return null;
}

async function request(url, options = {}) {
  const response = await fetch(url, {...options, signal: AbortSignal.timeout(30000)});
  if (!response.ok) throw new Error(`Request failed (${response.status}) for ${new URL(url).hostname}`);
  return response;
}

async function fetchRepo(name) {
  const headers = {'User-Agent':'eldiyar-stack-digest', Accept:'application/vnd.github+json'};
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const repo = await (await request(`https://api.github.com/repos/${name}`, {headers})).json();
  if (!isValidRepo(repo)) throw new Error(`Invalid GitHub response for ${name}`);
  const response = await fetch(`https://api.github.com/repos/${name}/readme`, {headers, signal:AbortSignal.timeout(30000)});
  let readme = '';
  if (response.ok) {
    const body = await response.json();
    if (typeof body.content === 'string') readme = Buffer.from(body.content, 'base64').toString('utf8');
  } else if (response.status !== 404) {
    throw new Error(`Failed to fetch README for ${name} (${response.status})`);
  }
  return {repo, readme};
}

async function resolveImage(repo, readme) {
  const candidate = findReadmeImage(readme, repo.full_name, repo.default_branch);
  if (candidate) {
    try {
      const response = await fetch(candidate, {signal:AbortSignal.timeout(15000)});
      const type = response.headers.get('content-type') || '';
      const size = Number(response.headers.get('content-length')) || 0;
      const valid = response.ok && /^image\/(png|jpeg)$/i.test(type.split(';')[0]) && size <= 10_000_000;
      await response.body?.cancel();
      if (valid) return candidate;
    } catch { /* GitHub social preview is used when the image is unavailable. */ }
  }
  return `https://opengraph.githubassets.com/1/${repo.full_name}`;
}

async function generateContent(repo, readme, dryRun) {
  if (dryRun) return {title:repo.full_name, summary:'Тестовое описание проекта.', benefit:'Проверка сбора дайджеста.', use_cases:['Тестирование'], tags:['test']};
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error('OPENROUTER_API_KEY is required');
  const prompt = `Подготовь содержательную краткую заметку о GitHub-репозитории на русском языке. Опирайся только на предоставленные факты. Не добавляй инструкции или команды установки. Верни только JSON с полями title (строка), summary (1–2 предложения), benefit (строка), use_cases (массив конкретных сценариев), tags (массив строк).\nРепозиторий: ${repo.full_name}\nОписание: ${repo.description || 'нет'}\nЯзык: ${repo.language || 'не указан'}\nТемы: ${(repo.topics || []).join(', ')}\nREADME:\n${readme.slice(0, 8000)}`;
  const response = await request('https://openrouter.ai/api/v1/chat/completions', {
    method:'POST', headers:{Authorization:`Bearer ${key}`, 'Content-Type':'application/json', 'HTTP-Referer':'https://eldiyar.dev', 'X-Title':'Stack Digest'},
    body:JSON.stringify({model:process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash-lite', messages:[{role:'user', content:prompt}], response_format:{type:'json_object'}, temperature:0.3, max_tokens:900}),
  });
  const result = await response.json();
  const text = result.choices?.[0]?.message?.content;
  if (typeof text !== 'string') throw new Error('OpenRouter returned no content');
  let content;
  try { content = JSON.parse(text); } catch { throw new Error('OpenRouter returned invalid JSON'); }
  if (!['title','summary','benefit'].every(key => typeof content[key] === 'string' && content[key].trim()) || !['use_cases','tags'].every(key => Array.isArray(content[key]) && content[key].every(value => typeof value === 'string'))) throw new Error('OpenRouter returned invalid post content');
  return {title:content.title, summary:content.summary, benefit:content.benefit, use_cases:content.use_cases, tags:content.tags};
}

async function saveData(data) {
  const temp = `${DATA_FILE}.${process.pid}.tmp`;
  try {
    await writeFile(temp, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    await rename(temp, DATA_FILE);
  } finally {
    await unlink(temp).catch(() => {});
  }
}

export async function collect() {
  const data = JSON.parse(await readFile(DATA_FILE, 'utf8'));
  if (!Array.isArray(data.posts) || !Array.isArray(data.seen)) throw new Error('Invalid digest JSON: posts and seen must be arrays');
  const limit = Number(process.env.DIGEST_COUNT || 2);
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 25) throw new Error('DIGEST_COUNT must be between 1 and 25');
  const dryRun = process.env.DRY_RUN === 'true';
  if (!dryRun && !process.env.OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY is required');
  const today = new Intl.DateTimeFormat('en-CA', {timeZone:'Europe/Istanbul', year:'numeric', month:'2-digit', day:'2-digit'}).format(new Date());
  let remaining = remainingToday(data, today, limit);
  if (!remaining) { console.log('Daily digest limit already reached'); return; }
  const html = await (await request('https://trendshift.io/', {headers:{'User-Agent':'Mozilla/5.0', Accept:'text/html'}})).text();
  const trending = parseTrending(html);
  console.log(`Trendshift returned ${trending.length} ranked repositories`);
  let failures = 0;
  for (const candidate of trending) {
    if (!remaining) break;
    if (isDuplicate(data, {full_name:candidate.name, html_url:`https://github.com/${candidate.name}`})) continue;
    try {
      const {repo, readme} = await fetchRepo(candidate.name);
      if (isDuplicate(data, repo)) continue;
      const content = await generateContent(repo, readme, dryRun);
      const imageUrl = await resolveImage(repo, readme);
      const now = new Date().toISOString();
      const baseSlug = repo.full_name.replace('/', '-');
      const slug = data.posts.some(post => post.slug.toLowerCase() === baseSlug.toLowerCase()) ? `${baseSlug}-${repo.id}` : baseSlug;
      const post = {slug, repoId:repo.id, repoName:repo.full_name, githubUrl:repo.html_url, trendshiftUrl:candidate.trendshiftUrl, language:repo.language || '', stars:repo.stargazers_count, postedAt:now, collectedOn:today, imageUrl, content, telegram:{status:'pending'}};
      data.posts.unshift(post);
      data.seen.push({repoFullName:repo.full_name, firstSeen:now, postedAt:now});
      if (!dryRun) await saveData(data);
      remaining--;
      console.log(`${dryRun ? '[DRY_RUN] Would collect' : 'Collected'} ${repo.full_name}`);
    } catch (error) {
      failures++;
      console.error(`Unable to collect ${candidate.name}: ${error.message}`);
    }
  }
  if (remaining && failures) throw new Error(`Failed to fill daily digest; ${remaining} slot(s) remain`);
  if (remaining) console.log('No more unpublished repositories available');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  collect().catch(error => { console.error(error.message); process.exitCode = 1; });
}
