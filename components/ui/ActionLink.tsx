import type {ComponentPropsWithoutRef} from 'react';
import styles from './action-link.module.css';

export type ActionLinkProps = ComponentPropsWithoutRef<'a'>;

/** Семантическая ссылка-действие для переходов к разделам и публичным контактам. */
export function ActionLink({children, className, href, ...props}: ActionLinkProps) {
  const email = href?.startsWith('mailto:') ? href.slice(7).split('?')[0] : undefined;
  return <a {...props} href={href} className={[className, email && styles.emailLink].filter(Boolean).join(' ')} data-email={email}>{children}</a>;
}
