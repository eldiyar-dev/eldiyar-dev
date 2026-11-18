import enMessages from '@/messages/en.json';
import ruMessages from '@/messages/ru.json';
import trMessages from '@/messages/tr.json';
import arMessages from '@/messages/ar.json';
import {defaultLocale, getLocalizedPath, type Locale} from '@/lib/i18n';
import {siteSlugs, type SiteSlug} from '@/lib/site-routes';
import {stackCatalog} from '@/data/stackCatalog';

export type SitePageId = 'home' | SiteSlug;
export type SiteLocale = Locale;
export type NavigationPageId = SitePageId | 'stack';

export type PageMetadata = {title: string; description: string; url: string; offer: string; cta: string};
export type SiteIcon = keyof typeof import('@/components/SiteIllustration').iconPaths;
export type SiteMetric = {label: string; value: string; end?: string};
export type SiteItem = {
  title: string;
  text?: string;
  icon?: SiteIcon;
  href?: string;
  price?: string;
  metrics?: SiteMetric[];
};
export type SiteSection = {
  kind: 'cards' | 'flow' | 'parallel' | 'checks' | 'cases' | 'details';
  title: string;
  note?: string;
  items: SiteItem[];
};
export type SitePage = {
  metadata: PageMetadata;
  hero: {title: string; lead: string};
  facts?: string[];
  sections: SiteSection[];
  related?: {title: string; href: string};
};
export type FaqItem = {question: string; answer: string[]};
export type FaqGroup = {title: string; items: FaqItem[]};
export type FaqContent = {title: string; groups: FaqGroup[]};

type SiteMessages = {faq: FaqContent; site: {pages: Record<'index' | SiteSlug, SitePage>}};

const messages: Record<SiteLocale, SiteMessages> = {
  en: enMessages as SiteMessages,
  ru: ruMessages as SiteMessages,
  tr: trMessages as SiteMessages,
  ar: arMessages as SiteMessages
};

export function getFaqContent(locale: SiteLocale = defaultLocale): FaqContent {
  return messages[locale].faq;
}

export function getSitePage(id: SitePageId, locale: SiteLocale = defaultLocale): SitePage {
  return messages[locale].site.pages[id === 'home' ? 'index' : id];
}

export function getCaseLink(locale: SiteLocale) {
  const labels: Record<SiteLocale, string> = {
    ru: 'Все проекты в CV',
    en: 'See all projects in my CV',
    tr: 'Tüm projeler özgeçmişimde',
    ar: 'جميع المشاريع في سيرتي الذاتية',
  };
  return {title: labels[locale], href: `${getLocalizedPath('/cv', locale)}#cases`};
}

export function getAllPageMetadata(locale: SiteLocale = defaultLocale): Array<PageMetadata & {id: NavigationPageId}> {
  const stackUi = stackCatalog.ui[locale === 'ru' ? 'ru' : 'en'];
  const stackMetadata: PageMetadata & {id: 'stack'} = {
    id: 'stack',
    url: '/stack',
    title: stackUi.title,
    description: stackUi.description,
    offer: 'Stack',
    cta: 'Stack'
  };
  const ids: SitePageId[] = ['home', ...siteSlugs];
  return [...ids.map(id => ({id, ...getSitePage(id, locale).metadata})), stackMetadata];
}
