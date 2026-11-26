import {execFileSync} from 'node:child_process';
import {readFile, rename, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {setTimeout as delay} from 'node:timers/promises';
import {fileURLToPath} from 'node:url';

const dataPath = 'data/stack-digest.json';
const site = 'https://eldiyar.dev';
const imageHosts = new Set([
  'github.com', 'raw.githubusercontent.com', 'opengraph.githubassets.com',
  'user-images.githubusercontent.com', 'private-user-images.githubusercontent.com',
]);

const escapeHtml = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const shorten = (text, limit) => text.length <= limit ? text : text.slice(0, limit - 2).trimEnd() + '…';

export function telegramPayload(post, articleUrl) {
  return {
    parse_mode: 'HTML',
    caption: `<b>${escapeHtml(shorten(post.content.title, 150))}</b>\n\n${escapeHtml(shorten(post.content.summary, 840))}`,
    reply_markup: {inline_keyboard: [[
      {text: 'Читать подробнее', url: articleUrl},
      {text: 'GitHub', url: post.githubUrl},
    ]]},
  };
}

export async function publishPending(posts, {waitForPage, prepare, persist, send}) {
  const uncertain = posts.filter(post => post.telegram?.status === 'sending');
  const pending = posts.filter(post => post.telegram?.status === 'pending').reverse();
  const failures = uncertain.length
    ? [`Статус публикации неизвестен, проверьте канал: ${uncertain.map(post => post.slug).join(', ')}`]
    : [];

  for (const post of pending) {
    const articleUrl = `${site}/ru/stack/digest/${encodeURIComponent(post.slug)}`;
    await waitForPage(articleUrl);
    let message;
    try {
      message = await prepare(post, articleUrl);
    } catch (error) {
      failures.push(error.message);
      continue;
    }
    post.telegram = {status: 'sending'};
    await persist(post, 'claim Telegram post');

    const result = await send(message);
    if (result.kind === 'rejected') {
      post.telegram = {status: 'pending'};
      await persist(post, 'release Telegram post');
      failures.push(`Telegram отклонил публикацию ${post.slug} (код ${result.code})`);
      continue;
    }
    post.telegram = {status: 'sent', messageId: result.messageId};
    await persist(post, 'record Telegram post');
  }

  if (failures.length) throw new Error(failures.join('\n'));
}

function isGithubImage(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && imageHosts.has(url.hostname);
  } catch {
    return false;
  }
}

async function fetchPhoto(url) {
  if (!isGithubImage(url)) return null;
  try {
    const signal = AbortSignal.timeout(12_000);
    let response = await fetch(url, {signal, redirect: 'manual'});
    for (let redirects = 0; redirects < 3 && response.status >= 300 && response.status < 400; redirects++) {
      const location = response.headers.get('location');
      await response.body?.cancel();
      if (!location) return null;
      url = new URL(location, url).href;
      if (!isGithubImage(url)) return null;
      response = await fetch(url, {signal, redirect: 'manual'});
    }
    const type = response.headers.get('content-type')?.split(';')[0];
    if (!response.ok || !isGithubImage(response.url) || !['image/png', 'image/jpeg'].includes(type)) {
      await response.body?.cancel();
      return null;
    }
    const chunks = [];
    let size = 0;
    for await (const chunk of response.body) {
      size += chunk.length;
      if (size > 10_000_000) return null;
      chunks.push(chunk);
    }
    return size ? new Blob(chunks, {type}) : null;
  } catch {
    return null;
  }
}

async function prepareMessage(post, articleUrl, chatId) {
  const fallback = `https://opengraph.githubassets.com/1/${post.repoName.split('/').map(encodeURIComponent).join('/')}`;
  const photo = await fetchPhoto(post.imageUrl) ?? await fetchPhoto(fallback);
  if (!photo) throw new Error(`Не удалось получить изображение GitHub для ${post.slug}`);
  const payload = telegramPayload(post, articleUrl);
  const body = new FormData();
  body.set('chat_id', chatId);
  body.set('photo', photo, photo.type === 'image/png' ? 'github.png' : 'github.jpg');
  body.set('parse_mode', payload.parse_mode);
  body.set('caption', payload.caption);
  body.set('reply_markup', JSON.stringify(payload.reply_markup));
  return body;
}

async function waitForPage(articleUrl) {
  const deadline = Date.now() + 10 * 60_000;
  do {
    const response = await fetch(articleUrl, {signal: AbortSignal.timeout(12_000)}).catch(() => null);
    if (response?.ok && response.url === articleUrl) {
      const html = await response.text().catch(() => '');
      if (html.includes(`rel="canonical" href="${articleUrl}"`)) return;
    } else {
      await response?.body?.cancel();
    }
    await delay(15_000);
  } while (Date.now() < deadline);
  throw new Error(`Vercel ещё не опубликовал ${articleUrl}`);
}

async function sendPhoto(token, body) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(25_000),
    });
    const data = await response.json();
    if (response.ok && data.ok && Number.isInteger(data.result?.message_id)) {
      return {kind: 'sent', messageId: data.result.message_id};
    }
    if (response.status >= 400 && response.status < 500 && data.ok === false) {
      return {kind: 'rejected', code: data.error_code ?? response.status};
    }
  } catch {
    // Telegram may have accepted the message before the connection closed.
  }
  throw new Error('Telegram не подтвердил результат отправки. Проверьте канал перед повтором.');
}

async function run() {
  const data = JSON.parse(await readFile(dataPath, 'utf8'));
  if (!data.posts.some(post => ['pending', 'sending'].includes(post.telegram?.status))) return;
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim().replace(/^bot/, '');
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) throw new Error('Нужны TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID');

  await publishPending(data.posts, {
    waitForPage,
    prepare: (post, articleUrl) => prepareMessage(post, articleUrl, chatId),
    send: body => sendPhoto(token, body),
    persist: async (post, action) => {
      const temp = `${dataPath}.${process.pid}.tmp`;
      await writeFile(temp, JSON.stringify(data, null, 2) + '\n');
      await rename(temp, dataPath);
      execFileSync('git', ['add', '--', dataPath], {stdio: 'inherit'});
      execFileSync('git', ['commit', '-m', `chore(stack): ${action} ${post.slug}`, '--', dataPath], {stdio: 'inherit'});
      execFileSync('git', ['push', 'origin', 'HEAD:main'], {stdio: 'inherit'});
    },
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
