import type {Locale} from '@/lib/i18n';

/** Публичный канал связи, используемый CTA контентных страниц. */
export const contactHref = 'mailto:eldiyar.dev@gmail.com';

/** Ссылка для связи в Telegram. */
export function diagnosticHref(_locale: Locale) {
  return 'https://t.me/EldiyarDev';
}
