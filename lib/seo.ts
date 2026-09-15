import type {Metadata} from 'next';
import type {PageMetadata, SiteLocale} from '@/lib/site-content';
import {getLocalizedPath} from '@/lib/i18n';

/** Публичный канонический адрес сайта, подтверждённый в материалах проекта. */
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

/** Собирает согласованные метаданные для контентных страниц на всех языках. */
export function createSiteMetadata(page: PageMetadata, locale: SiteLocale): Metadata {
  const canonical = getLocalizedPath(page.url, locale);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical,
      languages: Object.fromEntries(['ru', 'en', 'tr', 'ar'].map(locale => [locale, getLocalizedPath(page.url, locale as SiteLocale)]))
    },
    openGraph: {
      type: 'website', url: absoluteUrl(canonical), title: page.title, description: page.description,
      locale: openGraphLocales[locale], siteName: 'Eldiyar', images: [ogImage]
    },
    twitter: {card: 'summary', title: page.title, description: page.description, images: [ogImage.url]}
  };
}

/** Метаданные для локализованной страницы резюме. */
export function createCvMetadata(name: string, role: string, description: string, locale: SiteLocale): Metadata {
  const canonical = getLocalizedPath('/cv', locale);
  const title = `${name} — ${role}`;

  return {
    title, description,
    alternates: {canonical, languages: Object.fromEntries(['ru', 'en', 'tr', 'ar'].map(localeCode => [localeCode, getLocalizedPath('/cv', localeCode as SiteLocale)]))},
    openGraph: {type: 'profile', url: absoluteUrl(canonical), title, description, locale: openGraphLocales[locale], siteName: 'Eldiyar', images: [ogImage]},
    twitter: {card: 'summary', title, description, images: [ogImage.url]}
  };
}
