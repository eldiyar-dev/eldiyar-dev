import Link from 'next/link';
import {BrandLink} from '@/components/ui';
import {getAllPageMetadata, type SiteLocale} from '@/lib/site-content';
import {getLocalizedPath} from '@/lib/i18n';
import styles from './site.module.css';

export type SiteNavigationProps = {locale: SiteLocale; currentUrl: string; copyLocale?: 'en' | 'ru'};

const labels = {
  en: {home: 'Home', navigation: 'Main navigation'},
  ru: {home: 'На главную', navigation: 'Основная навигация'},
  tr: {home: 'Ana sayfa', navigation: 'Ana menü'},
  ar: {home: 'الرئيسية', navigation: 'القائمة الرئيسية'},
};

/** Основная навигация между страницами одного типа контента. */
export function SiteNavigation({locale, currentUrl, copyLocale}: SiteNavigationProps) {
  const contentLocale = copyLocale ?? locale;
  const pages = getAllPageMetadata(contentLocale);
  return <header className={styles.topbar}><BrandLink href={getLocalizedPath('/', locale)} label={labels[contentLocale].home} /><nav aria-label={labels[contentLocale].navigation}>{pages.filter(page => page.url !== currentUrl).map(page => <Link key={page.id} href={getLocalizedPath(page.url, locale)}>{page.offer}</Link>)}</nav></header>;
}
