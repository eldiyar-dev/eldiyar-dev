import Link from 'next/link';
import {ActionLink} from '@/components/ui';
import {getLocalizedPath} from '@/lib/i18n';
import {getCaseLink} from '@/lib/site-content';
import type {FaqContent, SiteItem, SiteLocale, SiteMetric, SitePage as SitePageData, SiteSection} from '@/lib/site-content';
import {FaqSection} from './FaqSection';
import {FluidHero} from './FluidHero';
import {SiteFooter} from './SiteFooter';
import {ProcessConnector, SiteIcon, SiteIllustration} from './SiteIllustration';
import {SiteNavigation} from './SiteNavigation';
import {HeroStack} from './HeroStack';
import {diagnosticHref} from './site.constants';
import fluidStyles from './fluid.module.css';
import styles from './marketing.module.css';
import shell from './site.module.css';

type SitePageProps = {page: SitePageData; locale: SiteLocale; faq: FaqContent};

const metricJoin: Record<SiteLocale, string> = {
  ru: 'до',
  en: 'to',
  tr: '→',
  ar: 'إلى',
};

export function SitePage({page, locale, faq}: SitePageProps) {
  const {metadata, hero, facts, sections, related} = page;
  const contact = <ActionLink className={shell.primaryButton} href={diagnosticHref(locale)}>
    <SiteIcon name="send" />{metadata.cta}
  </ActionLink>;

  return <main className={`${shell.site} ${styles.page}`}>
    <section className={shell.hero}>
      <FluidHero>
        <div className={`${shell.container} ${fluidStyles.contentLayer}`}>
          <SiteNavigation locale={locale} currentUrl={metadata.url} />
          <div className={styles.hero}>
            <div>
              <h1>{hero.title}</h1>
              <p className={styles.lead}>{hero.lead}</p>
              {facts?.length ? <ul className={styles.facts} role="list">
                {facts.map((fact, index) => <li key={fact}>
                  <SiteIcon name={index === 0 ? 'cost' : 'clock'} /><span>{fact}</span>
                </li>)}
              </ul> : null}
              <div className={styles.contact}>{contact}</div>
            </div>
            <SiteIllustration path={metadata.url} />
            {metadata.url === '/' && <HeroStack locale={locale} />}
          </div>
        </div>
      </FluidHero>
    </section>
    <div className={`${shell.container} ${styles.body}`}>
      {sections.map((section, index) => <Section
        key={section.title}
        section={section}
        locale={locale}
        related={index === 0 && section.kind === 'cards' ? related : undefined}
      />)}
      <FaqSection content={faq} />
      <div className={styles.endContact}>{contact}</div>
    </div>
    <SiteFooter locale={locale} currentPath={metadata.url} localizedLabels />
  </main>;
}

function Section({section, locale, related}: {section: SiteSection; locale: SiteLocale; related?: SitePageData['related']}) {
  const {kind, title, note, items} = section;
  const caseLink = kind === 'cases' ? getCaseLink(locale) : undefined;

  return <section className={styles.section}>
    <h2>{title}</h2>
    {note && <p className={styles.note}>{note}</p>}
    {kind === 'details' ? <div className={styles.disclosures}>
      {items.map(item => <details key={item.title} className={shell.faqItem}>
        <summary>{item.title}<span aria-hidden="true" /></summary>
        <div className={shell.faqAnswer}><p>{item.text}</p></div>
      </details>)}
    </div> : kind === 'flow' || kind === 'parallel' || kind === 'checks'
      ? <ProcessSteps items={items} kind={kind} />
      : <ul className={styles.cards} role="list" data-cards={kind}>
        {items.map(item => <li key={item.title}><ContentCard item={item} locale={locale} /></li>)}
      </ul>}
    {caseLink && <Link className={styles.sectionLink} href={caseLink.href}>
      {caseLink.title}<Arrow />
    </Link>}
    {related && <Link className={styles.sectionLink} href={getLocalizedPath(related.href, locale)}>
      {related.title}<Arrow />
    </Link>}
  </section>;
}

function ContentCard({item, locale}: {item: SiteItem; locale: SiteLocale}) {
  return <article className={styles.card}>
    {item.icon && <span className={styles.iconTile}><SiteIcon name={item.icon} /></span>}
    <h3>{item.href ? <Link href={getLocalizedPath(item.href, locale)}>
      {item.title}<Arrow />
    </Link> : item.title}</h3>
    {item.metrics?.length ? <dl className={styles.metrics}>
      {item.metrics.map(metric => <Metric key={metric.label} metric={metric} locale={locale} />)}
    </dl> : null}
    {item.text && <p>{item.text}</p>}
    {item.price && <p className={styles.price}>{item.price}</p>}
  </article>;
}

function Metric({metric, locale}: {metric: SiteMetric; locale: SiteLocale}) {
  return <div>
    <dt>{metric.label}</dt>
    <dd>
      <bdi>{metric.value}</bdi>
      {metric.end && <><Arrow /><span className={styles.visuallyHidden}>{metricJoin[locale]}</span><bdi>{metric.end}</bdi></>}
    </dd>
  </div>;
}

function ProcessSteps({items, kind}: {items: SiteItem[]; kind: 'flow' | 'parallel' | 'checks'}) {
  if (kind === 'flow') return <ol className={`${styles.process} ${styles.flow}`} role="list" data-process={kind}>
    {items.map((item, index) => <li key={item.title}>
      <Step item={item} />
      {index < items.length - 1 && <span className={styles.flowArrow}><Arrow /></span>}
    </li>)}
  </ol>;

  const result = items[items.length - 1];
  if (kind === 'parallel') {
    const [start, ...branches] = items.slice(0, -1);
    return <div className={`${styles.process} ${styles.parallel}`} data-process={kind}>
      <Step item={start} />
      <ProcessConnector direction="split" />
      <ul className={styles.branches} role="list">{branches.map(item => <li key={item.title}><Step item={item} /></li>)}</ul>
      <ProcessConnector direction="merge" />
      <Step item={result} />
    </div>;
  }

  return <div className={`${styles.process} ${styles.checks}`} data-process={kind}>
    <ul className={styles.branches} role="list">{items.slice(0, -1).map(item => <li key={item.title}><Step item={item} /></li>)}</ul>
    <ProcessConnector direction="checks" />
    <Step item={result} />
  </div>;
}

function Step({item}: {item: SiteItem}) {
  return <div className={styles.step}>
    {item.icon && <span className={styles.iconTile}><SiteIcon name={item.icon} /></span>}
    <div><h3>{item.title}</h3>{item.text && <p>{item.text}</p>}</div>
  </div>;
}

function Arrow() {
  return <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M4 12h15m-6-6 6 6-6 6" />
  </svg>;
}
