import type {MetadataRoute} from 'next';
import {defaultLocale, getLocalizedPath, locales} from '@/lib/i18n';
import {getAllPageMetadata} from '@/lib/site-content';
import {siteUrl} from '@/lib/seo';
import {digestPosts, digestPostPath} from '@/lib/stack-digest';

function absolutePath(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

/** Перечисляет только статически существующие публичные страницы сайта. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...getAllPageMetadata(defaultLocale).map(page => page.url), '/cv'];

  const pages = paths.flatMap(pathname => {
    const alternates = {languages: {...Object.fromEntries(locales.map(locale => [locale, absolutePath(getLocalizedPath(pathname, locale))])), 'x-default': absolutePath(getLocalizedPath(pathname, defaultLocale))}};
    return locales.map(locale => ({url: absolutePath(getLocalizedPath(pathname, locale)), alternates}));
  });
  return [...pages, {url: absolutePath('/ru/stack/digest')}, ...digestPosts.map(post => ({url: absolutePath(digestPostPath(post)), lastModified: post.postedAt}))];
}
