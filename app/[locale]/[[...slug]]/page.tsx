import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import CvPage from '@/components/CvPage';
import {SitePage} from '@/components/SitePage';
import {StackPage} from '@/components/StackPage';
import {DigestArchive, DigestArticle} from '@/components/StackDigest';
import {stackCatalog} from '@/data/stackCatalog';
import {getLocalizedStaticParams, isLocale, type Locale} from '@/lib/i18n';
import {createCvMetadata, createSiteMetadata, createSiteStructuredData} from '@/lib/seo';
import {digestPosts, digestPostPath, type DigestPost} from '@/lib/stack-digest';
import {getFaqContent, getSitePage, type SitePageId} from '@/lib/site-content';
import {isSiteSlug, siteRouteSegments} from '@/lib/site-routes';

type RouteParams = {locale: string; slug?: string[]};
type PageRoute = {kind: 'cv'} | {kind: 'site'; id: SitePageId} | {kind: 'stack'} | {kind: 'digest'} | {kind: 'digest-post'; post: DigestPost};

export const dynamicParams = false;

/** Pre-render every internal locale route. */
export function generateStaticParams() {
  return [...getLocalizedStaticParams(siteRouteSegments), {locale: 'ru', slug: ['stack', 'digest']}, ...digestPosts.map(post => ({locale: 'ru', slug: ['stack', 'digest', post.slug]}))];
}

function getPageRoute(locale: Locale, slug?: string[]): PageRoute {
  if (!slug?.length) return {kind: 'site', id: 'home'};
  if (slug.length === 1 && slug[0] === 'cv') return {kind: 'cv'};
  if (slug.length === 1 && slug[0] === 'stack') return {kind: 'stack'};
  if (locale === 'ru' && slug[0] === 'stack' && slug[1] === 'digest') {
    if (slug.length === 2) return {kind: 'digest'};
    if (slug.length === 3) {
      const post = digestPosts.find(entry => entry.slug === slug[2]);
      if (post) return {kind: 'digest-post', post};
    }
  }
  if (slug.length === 1 && isSiteSlug(slug[0])) return {kind: 'site', id: slug[0]};
  notFound();
}

function getRouteParams(params: RouteParams): {locale: Locale; route: PageRoute} {
  if (!isLocale(params.locale)) notFound();
  return {locale: params.locale, route: getPageRoute(params.locale, params.slug)};
}

async function getCvContent(locale: Locale) {
  return (await import(`@/messages/${locale}.json`)).default.cv;
}

export async function generateMetadata({params}: {params: Promise<RouteParams>}): Promise<Metadata> {
  const {locale, route} = getRouteParams(await params);
  if (route.kind === 'site') return createSiteMetadata(getSitePage(route.id, locale).metadata, locale);
  if (route.kind === 'digest') {
    const title = 'Digest — проекты GitHub';
    const description = 'Дайджест интересных проектов GitHub с описаниями на русском языке.';
    return {title, description, alternates: {canonical: '/ru/stack/digest'}, openGraph: {type: 'website', title, description, url: '/ru/stack/digest', locale: 'ru_RU'}};
  }
  if (route.kind === 'digest-post') {
    const {post} = route;
    const title = post.content.title;
    const description = post.content.summary;
    const url = digestPostPath(post);
    const images = post.imageUrl ? [{url: post.imageUrl, alt: post.repoName}] : undefined;
    return {title, description, alternates: {canonical: url}, openGraph: {type: 'article', title, description, url, publishedTime: post.postedAt, locale: 'ru_RU', images}, twitter: {card: 'summary_large_image', title, description, images: post.imageUrl ? [post.imageUrl] : undefined}};
  }
  if (route.kind === 'stack') {
    const language = locale === 'ru' ? 'ru' : 'en';
    const ui = stackCatalog.ui[language];
    return createSiteMetadata({title: ui.title, description: ui.description, url: '/stack', offer: 'Stack', cta: 'Stack'}, locale);
  }
  const content = await getCvContent(locale);
  const {name, role, title, lead} = content.hero;
  return createCvMetadata(name, role, `${title} ${lead}`, locale);
}

export default async function Page({params}: {params: Promise<RouteParams>}) {
  const {locale, route} = getRouteParams(await params);
  if (route.kind === 'site') {
    const pageData = getSitePage(route.id, locale);
    const faq = getFaqContent(locale);
    const structuredData = createSiteStructuredData(pageData, faq, locale);
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} /><SitePage page={pageData} locale={locale} faq={faq} /></>;
  }
  if (route.kind === 'stack') return <StackPage locale={locale} catalog={stackCatalog} />;
  if (route.kind === 'digest') return <DigestArchive posts={digestPosts} />;
  if (route.kind === 'digest-post') return <DigestArticle post={route.post} />;
  const content = await getCvContent(locale);
  return <NextIntlClientProvider locale={locale} messages={{cv: content}}><CvPage locale={locale} content={content} /></NextIntlClientProvider>;
}
