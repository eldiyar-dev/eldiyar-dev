import {getCaseLink, getFaqContent, getSitePage, type SiteItem, type SitePageId} from '@/lib/site-content';
import {getLocalizedPath, locales} from '@/lib/i18n';
import {siteUrl} from '@/lib/seo';
import {siteSlugs} from '@/lib/site-routes';
import {diagnosticHref} from '@/components/site.constants';

export const dynamic = 'force-static';

type Locale = (typeof locales)[number];

function renderItem(item: SiteItem, locale: Locale) {
  const title = item.href ? `[${item.title}](${getLocalizedPath(item.href, locale)})` : item.title;
  const metrics = item.metrics?.map(({label, value, end}) => `${label}: ${value}${end ? ` → ${end}` : ''}`);
  return [title, item.price, item.text, ...(metrics ?? [])].filter(Boolean).join(' — ');
}

function renderPage(locale: Locale, id: SitePageId) {
  const page = getSitePage(id, locale);
  const caseLink = getCaseLink(locale);
  const sections = page.sections.map(({title, kind, note, items}) => [
    `### ${title}`,
    note,
    items.map((item, index) => `${kind === 'flow' ? `${index + 1}.` : '-'} ${renderItem(item, locale)}`).join('\n'),
    kind === 'cases' && `[${caseLink.title}](${caseLink.href})`
  ].filter(Boolean).join('\n\n'));
  const related = page.related;
  return [
    `## ${page.hero.title}`,
    `URL: ${new URL(getLocalizedPath(page.metadata.url, locale), siteUrl)}`,
    page.hero.lead,
    page.facts?.join(' · '),
    ...sections,
    related && renderItem(related, locale),
    `[${page.metadata.cta}](${diagnosticHref(locale)})`
  ].filter(Boolean).join('\n\n');
}

function renderFaq(locale: Locale) {
  const faq = getFaqContent(locale);
  return [
    `## ${faq.title}`,
    ...faq.groups.flatMap(group => group.items.map(({question, answer}) => `### ${question}\n\n${answer.join(' ')}`))
  ].join('\n\n');
}

export function GET() {
  const ids = ['home', ...siteSlugs] as const;
  const body = locales.flatMap(locale => [
    '# Language: ' + locale,
    '',
    ...ids.map(id => renderPage(locale, id)),
    renderFaq(locale)
  ]).join('\n\n');
  return new Response(body, {headers: {'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600'}});
}
