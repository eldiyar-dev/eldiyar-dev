import type {FaqContent} from '@/lib/site-content';
import styles from './site.module.css';
import marketingStyles from './marketing.module.css';

export function FaqSection({content}: {content: FaqContent}) {
  return <section className={marketingStyles.section} aria-labelledby="faq-title">
    <h2 id="faq-title">{content.title}</h2>
    {content.groups.map(group => <div className={marketingStyles.disclosures} key={group.title}>
      {content.groups.length > 1 && <h3>{group.title}</h3>}
      {group.items.map(item => <details className={styles.faqItem} key={item.question}>
        <summary>{item.question}<span aria-hidden="true" /></summary>
        <div className={styles.faqAnswer}><p>{item.answer.join(' ')}</p></div>
      </details>)}
    </div>)}
  </section>;
}
