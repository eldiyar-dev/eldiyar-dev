import type {Metadata} from 'next';
import type {PageMetadata, SiteLocale, FaqContent, SitePage} from '@/lib/site-content';
import {defaultLocale, getLocalizedPath, locales} from '@/lib/i18n';

export const siteUrl = new URL('https://eldiyar.dev');

function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteUrl).toString();
}
const ogImage = {url: absoluteUrl('/logo.svg'), alt: 'Eldiyar logo'};

const openGraphLocales: Record<SiteLocale, string> = {
  ru: 'ru_RU',
  en: 'en_US',
  tr: 'tr_TR',
  ar: 'ar_AR'
};

const localeAlternates = (pathname: string) => ({
  ...Object.fromEntries(locales.map(locale => [locale, getLocalizedPath(pathname, locale)])),
  'x-default': getLocalizedPath(pathname, defaultLocale)
});

export function createSiteMetadata(page: PageMetadata, locale: SiteLocale): Metadata {
  const canonical = getLocalizedPath(page.url, locale);
  return {
    title: page.title,
    description: page.description,
    alternates: {canonical, languages: localeAlternates(page.url)},
    openGraph: {
      type: 'website',
      url: absoluteUrl(canonical),
      title: page.title,
      description: page.description,
      locale: openGraphLocales[locale],
      siteName: 'Eldiyar',
      images: [ogImage]
    },
    twitter: {card: 'summary', title: page.title, description: page.description, images: [ogImage.url]}
  };
}

export function createCvMetadata(name: string, role: string, description: string, locale: SiteLocale): Metadata {
  const canonical = getLocalizedPath('/cv', locale);
  const title = name + ' — ' + role;
  return {
    title,
    description,
    alternates: {canonical, languages: localeAlternates('/cv')},
    openGraph: {type: 'profile', url: absoluteUrl(canonical), title, description, locale: openGraphLocales[locale], siteName: 'Eldiyar', images: [ogImage]},
    twitter: {card: 'summary', title, description, images: [ogImage.url]}
  };
}

export function createSiteStructuredData(page: SitePage, faq: FaqContent, locale: SiteLocale) {
  const pageUrl = absoluteUrl(getLocalizedPath(page.metadata.url, locale));
  const faqEntities = faq.groups.flatMap(group => group.items).map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {'@type': 'Answer', text: item.answer.join(' ')}
  }));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {'@type': 'WebSite', '@id': siteUrl.toString() + '#website', url: siteUrl.toString(), name: 'Eldiyar', inLanguage: locale},
      {'@type': 'Person', '@id': siteUrl.toString() + '#person', name: 'Eldiyar', url: absoluteUrl(getLocalizedPath('/cv', locale)), jobTitle: 'Product & Systems Engineer', sameAs: ['https://www.linkedin.com/in/eldiyar-dev/', 'https://t.me/EldiyarDev']},
      {'@type': 'WebPage', '@id': pageUrl + '#webpage', url: pageUrl, name: page.metadata.title, description: page.metadata.description, inLanguage: locale, isPartOf: {'@id': siteUrl.toString() + '#website'}, about: {'@id': siteUrl.toString() + '#person'}},
      {'@type': 'BreadcrumbList', itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Eldiyar', item: absoluteUrl(getLocalizedPath('/', locale))},
        {'@type': 'ListItem', position: 2, name: page.metadata.title, item: pageUrl}
      ]},
      {'@type': 'FAQPage', mainEntity: faqEntities}
    ]
  };
}
