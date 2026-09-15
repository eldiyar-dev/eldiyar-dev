import {getAllPageMetadata} from '@/lib/site-content';
import {getLocalizedPath, locales} from '@/lib/i18n';
import {siteUrl} from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  const pages = locales.flatMap(locale => getAllPageMetadata(locale).map(page => {
    const url = new URL(getLocalizedPath(page.url, locale), siteUrl).toString();
    return '- [' + page.title + '](' + url + '): ' + page.description;
  })).join('\n');
  const languages = locales.map(locale => '- ' + locale + ': ' + new URL(getLocalizedPath('/', locale), siteUrl).toString()).join('\n');
  const body = [
    '# Eldiyar',
    '',
    '> Product & Systems Engineer focused on reliable AI products, automation, payments, real-time systems, and high-load backend architecture.',
    '',
    '## Primary pages',
    '',
    pages,
    '',
    '## Languages',
    '',
    languages,
    '',
    '## Contact',
    '',
    '- Telegram: https://t.me/EldiyarDev',
    '- LinkedIn: https://www.linkedin.com/in/eldiyar-dev/',
    '',
    '## Content and claims',
    '',
    'The site describes engineering results from individual projects. Metrics are examples, not guarantees for a diagnostic review. Confidential project names and customer data are intentionally omitted. The diagnostic service does not include formal security audits, penetration testing, legal opinions, investment advice, management of client funds, or guaranteed availability.'
  ].join('\n');
  return new Response(body, {headers: {'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600'}});
}
