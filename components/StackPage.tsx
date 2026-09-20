import {SectionHeading} from '@/components/ui';
import type {Locale} from '@/lib/i18n';
import type {StackCatalog} from '@/data/stackCatalog';
import {SiteFooter} from './SiteFooter';
import {SiteNavigation} from './SiteNavigation';
import {FluidHero} from './FluidHero';
import fluidStyles from './fluid.module.css';
import styles from './stack.module.css';

type Props = {locale: Locale; catalog: StackCatalog};

function statusLabel(status: number, ui: Record<string, string>) {
  if (status === 2) return ui.using;
  if (status === 1) return ui.testing;
  return ui.queued;
}

/** Static presentation of the curated stack catalogue. */
export function StackPage({locale, catalog}: Props) {
  const language = locale === 'ru' ? 'ru' : 'en';
  const ui = catalog.ui[language] ?? catalog.ui.en;
  const categories = catalog.categories
    .map(category => ({category, entries: catalog.entries.filter(entry => entry.category === category.id)}))
    .filter(group => group.entries.length > 0);

  return <main className={styles.page} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
    <section className={styles.hero}>
      <FluidHero>
        <div className={`${styles.container} ${fluidStyles.contentLayer}`}>
          <SiteNavigation locale={locale} currentUrl="/stack" copyLocale={locale === 'ru' ? 'ru' : 'en'} />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>eldiyar.stack / {ui.sections}</p>
            <h1>{ui.title}</h1>
            <p className={styles.lead}>{ui.description}</p>
            <div className={styles.heroMeta} aria-label={ui.categories}>
              <span>{catalog.entries.length} entries</span>
              <span>{categories.length} categories</span>
              <span>{catalog.roleKits.length} role kits</span>
            </div>
          </div>
        </div>
      </FluidHero>
    </section>

    <div className={`${styles.container} ${styles.contentShell}`}>
      <nav className={styles.sectionNav} aria-label={locale === 'ru' ? 'Навигация по разделам' : 'Section navigation'}>
        <p className={styles.navTitle}>{locale === 'ru' ? 'Разделы' : 'Sections'}</p>
        <ul className={styles.navList}>
          <li><a href="#stack-role-kits">{locale === 'ru' ? 'Ролевые наборы' : 'Role kits'}</a></li>
          <li><a href="#stack-catalog">{locale === 'ru' ? 'Каталог' : 'Catalog'}</a></li>
          {categories.map(({category}) => <li key={category.id}><a href={`#category-${category.id}`}>{category[language]}</a></li>)}
        </ul>
      </nav>

      <div className={styles.contentColumn}>
      <section id="stack-role-kits" className={styles.kitsSection}>
        <SectionHeading eyebrow="01">{locale === 'ru' ? 'Ролевые наборы' : 'Role kits'}</SectionHeading>
        <div className={styles.kitGrid}>
          {catalog.roleKits.map((kit, index) => <article className={styles.kitCard} key={kit.id}>
            <span className={styles.cardIndex}>{String(index + 1).padStart(2, '0')}</span>
            <h3>{kit.label[language]}</h3>
            <p>{kit.note[language]}</p>
            <div className={styles.tags}>{kit.tools.map(tool => <span key={tool.name}>{tool.name}</span>)}</div>
            <div className={styles.kitLinks}>{kit.tools.map(tool => <a className={styles.cardLink} key={tool.name} href={tool.url} target="_blank" rel="noreferrer">{tool.name}<span aria-hidden="true">↗</span></a>)}</div>
          </article>)}
        </div>
      </section>

      <section id="stack-catalog" className={styles.catalogSection} aria-labelledby="stack-catalog-heading">
        <SectionHeading eyebrow="02">{locale === 'ru' ? 'Каталог' : 'Catalog'}</SectionHeading>
        <h2 id="stack-catalog-heading" className={styles.srOnly}>{locale === 'ru' ? 'Каталог инструментов' : 'Tool catalogue'}</h2>
        {categories.map(({category, entries}) => <section className={styles.category} key={category.id} aria-labelledby={`category-${category.id}`}>
          <header className={styles.categoryHeading}><h3 id={`category-${category.id}`}>{category[language]}</h3><span>{entries.length}</span></header>
          <div className={styles.entryGrid}>
            {entries.map(entry => <article className={styles.entryCard} key={entry.name}>
              <div className={styles.entryTop}><span className={styles.status}>{statusLabel(entry.status, ui)}</span><span className={styles.author}>@{entry.author}</span></div>
              <h4>{entry.name}</h4>
              <p>{entry.description[language]}</p>
              <div className={styles.entryBottom}>
                <div className={styles.tags}>{entry.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                <a className={styles.githubLink} href={entry.githubUrl} target="_blank" rel="noreferrer">{ui.open}<span aria-hidden="true">↗</span></a>
              </div>
            </article>)}
          </div>
        </section>)}
      </section>
      </div>
    </div>
    <SiteFooter locale={locale} currentPath="/stack" copyLocale={locale === 'ru' ? 'ru' : 'en'} />
  </main>;
}

export default StackPage;
