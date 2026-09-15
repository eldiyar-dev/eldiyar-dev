import Link from 'next/link';
import {BrandLink} from '@/components/ui';
import type {SiteLocale} from '@/lib/site-content';
import {getLocalizedPath, locales, type Locale} from '@/lib/i18n';
import {contactHref} from './site.constants';
import {FluidHero} from './FluidHero';
import fluidStyles from './fluid.module.css';
import styles from './site.module.css';

export type SiteFooterProps = {locale: SiteLocale; currentPath?: string};

const languageNames: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  tr: 'Türkçe',
  ar: 'العربية'
};

/** Footer с подтверждёнными публичными контактами и ссылкой на резюме. */
export function SiteFooter({locale, currentPath = '/'}: SiteFooterProps) {
  return <FluidHero><footer className={`${styles.container} ${styles.footer} ${fluidStyles.contentLayer}`}><BrandLink className={styles.footerBrand} href={getLocalizedPath('/', locale)} inverted label={locale === 'en' ? 'Eldiyar — home' : 'Eldiyar — на главную'} /><nav className={styles.footerLinks} aria-label={locale === 'en' ? 'Contacts and language' : 'Контакты и язык'}><a className={styles.footerLink} href={contactHref}><span>eldiyar.dev@gmail.com</span></a><a className={styles.footerLink} href="https://www.linkedin.com/in/eldiyar-dev/"><FooterIcon type="linkedin" /><span>LinkedIn</span></a><a className={styles.footerLink} href="https://t.me/EldiyarDev"><FooterIcon type="telegram" /><span>Telegram</span></a><Link className={styles.footerLink} href={getLocalizedPath('/cv', locale)}><FooterIcon type="cv" /><span>CV</span></Link><LanguagePicker locale={locale} currentPath={currentPath} /></nav></footer></FluidHero>;
}

function LanguagePicker({locale, currentPath}: {locale: Locale; currentPath: string}) {
  return <details className={styles.languagePicker}>
    <summary className={styles.languageSummary} aria-label={`Language: ${languageNames[locale]}`}>
      <FlagIcon locale={locale} />
      <span>{languageNames[locale]}</span>
      <svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5" /></svg>
    </summary>
    <div className={styles.languageMenu}>
      {locales.map(targetLocale => <Link key={targetLocale} className={styles.languageOption} href={getLocalizedPath(currentPath, targetLocale)} aria-current={targetLocale === locale ? 'page' : undefined}>
        <FlagIcon locale={targetLocale} />
        <span>{languageNames[targetLocale]}</span>
        <span className={styles.languageCode}>{targetLocale.toUpperCase()}</span>
      </Link>)}
    </div>
  </details>;
}

function FlagIcon({locale}: {locale: Locale}) {
  if (locale === 'ru') return <svg className={styles.flag} viewBox="0 0 24 16" aria-hidden="true"><path fill="#fff" d="M0 0h24v5.33H0z" /><path fill="#2454a6" d="M0 5.33h24v5.34H0z" /><path fill="#d52b1e" d="M0 10.67h24V16H0z" /></svg>;
  if (locale === 'tr') return <svg className={styles.flag} viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#e30a17" /><circle cx="10" cy="8" r="4.2" fill="#fff" /><circle cx="11.3" cy="8" r="3.35" fill="#e30a17" /><path fill="#fff" d="m15.1 4.9 1 2.35 2.55.2-1.95 1.62.6 2.48-2.2-1.33-2.2 1.33.6-2.48-1.95-1.62 2.55-.2Z" /></svg>;
  if (locale === 'ar') return <svg className={styles.flag} viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#006c35" /><path fill="#fff" d="M4 9.2h13.4c.9 0 1.5-.35 2.1-.9-.25 1.35-1.3 2.2-2.8 2.2H4Z" /><path fill="#fff" d="M5 6.3h10.7v.8H5z" /></svg>;
  return <svg className={styles.flag} viewBox="0 0 24 16" aria-hidden="true"><path fill="#b22234" d="M0 0h24v16H0z" /><path stroke="#fff" strokeWidth="1.23" d="M0 1.23h24M0 3.69h24M0 6.15h24M0 8.62h24M0 11.08h24M0 13.54h24" /><path fill="#3c3b6e" d="M0 0h10.8v8.62H0z" /><circle cx="2" cy="1.5" r=".45" fill="#fff" /><circle cx="5" cy="1.5" r=".45" fill="#fff" /><circle cx="8" cy="1.5" r=".45" fill="#fff" /><circle cx="3.5" cy="3" r=".45" fill="#fff" /><circle cx="6.5" cy="3" r=".45" fill="#fff" /><circle cx="2" cy="4.5" r=".45" fill="#fff" /><circle cx="5" cy="4.5" r=".45" fill="#fff" /><circle cx="8" cy="4.5" r=".45" fill="#fff" /><circle cx="3.5" cy="6" r=".45" fill="#fff" /><circle cx="6.5" cy="6" r=".45" fill="#fff" /></svg>;
}

function FooterIcon({type}: {type: 'linkedin' | 'telegram' | 'cv'}) {
  if (type === 'linkedin') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5H3.25V21H6.5V8.5ZM4.88 3A1.88 1.88 0 1 0 4.88 6.75 1.88 1.88 0 0 0 4.88 3ZM21 13.84C21 10.08 18.99 8.32 16.31 8.32c-2.18 0-3.15 1.2-3.69 2.04V8.5H9.38V21h3.24v-6.19c0-1.63.31-3.21 2.33-3.21 1.99 0 2.02 1.87 2.02 3.32V21H21v-7.16Z" /></svg>;
  if (type === 'telegram') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21.4 4.6-3.05 14.4c-.23 1.02-.84 1.27-1.7.79l-4.67-3.44-2.25 2.16c-.25.25-.46.46-.94.46l.34-4.75 8.65-7.81c.38-.34-.08-.53-.59-.19L6.5 12.9l-4.58-1.43c-1-.31-1.02-1 .21-1.48L20.05 3.8c.82-.3 1.54.19 1.35.8Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6V3Zm8 0v5h4M9 12h6M9 16h6" /></svg>;
}
