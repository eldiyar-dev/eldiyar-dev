import {getSitePage} from '@/lib/site-content';
import {getLocalizedPath, locales} from '@/lib/i18n';
import {siteUrl} from '@/lib/seo';

export const dynamic = 'force-static';

const renderPage = (locale: (typeof locales)[number], id: Parameters<typeof getSitePage>[0]) => {
  const page = getSitePage(id, locale);
  const body = page.nodes.map(node => {
    if (node.type === 'heading') return '#'.repeat(node.level) + ' ' + node.text;
    if (node.type === 'unordered-list') return node.items.map(item => '- ' + item).join('\n');
    if (node.type === 'ordered-list') return node.items.map((item, index) => (index + 1) + '. ' + item).join('\n');
    return node.text;
  }).join('\n\n');
  return '## ' + page.metadata.title + '\n\nURL: ' + new URL(getLocalizedPath(page.metadata.url, locale), siteUrl) + '\n\n' + page.metadata.description + '\n\n' + body;
};

export function GET() {
  const ids = ['home', 'ai-workflow-rescue', 'ai-launch-gate', 'capabilities', 'payments-reliability'] as const;
  const body = locales.flatMap(locale => [
    '# Language: ' + locale,
    '',
    ...ids.map(id => renderPage(locale, id))
  ]).join('\n\n');
  return new Response(body, {headers: {'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600'}});
}
