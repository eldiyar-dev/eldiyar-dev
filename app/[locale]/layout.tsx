import type {Metadata, Viewport} from 'next';
import {notFound} from 'next/navigation';
import {Geist, Geist_Mono} from 'next/font/google';
import {Analytics} from '@vercel/analytics/next';
import '../globals.css';
import {isLocale, localeDirections} from '@/lib/i18n';
import {siteUrl} from '@/lib/seo';

const geist = Geist({subsets: ['latin', 'cyrillic'], variable: '--font-geist'});
const geistMono = Geist_Mono({subsets: ['latin', 'cyrillic'], variable: '--font-geist-mono'});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {default: 'Eldiyar', template: '%s | Eldiyar'},
  description: 'Product & Systems Engineer',
  icons: {
    icon: [
      {url: '/favicon.ico', sizes: 'any'},
      {url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
      {url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png'}
    ],
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest',
  robots: {index: true, follow: true}
};

export const viewport: Viewport = {themeColor: '#fafbfa'};

export default async function LocaleLayout({children, params}: Readonly<{children: React.ReactNode; params: Promise<{locale: string}>}>) {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  return <html lang={locale} dir={localeDirections[locale]} className={`${geist.variable} ${geistMono.variable}`}><head><script async src="https://www.googletagmanager.com/gtm.js?id=GTM-PP2K8CVD" /><script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}} /></head><body>{children}</body></html>;
}
