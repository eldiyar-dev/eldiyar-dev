import Link from 'next/link';
import {SiteNavigation} from '@/components/SiteNavigation';
import {SiteFooter} from '@/components/SiteFooter';
import {FluidHero} from '@/components/FluidHero';
import {digestPostPath, type DigestPost} from '@/lib/stack-digest';
import fluidStyles from './fluid.module.css';
import styles from './stack-digest.module.css';

function dateLabel(value: string) {
  return new Intl.DateTimeFormat('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Istanbul'}).format(new Date(value));
}

function DigestLayout({children, title, lead}: {children: React.ReactNode; title: string; lead?: string}) {
  return <main className={styles.page}>
    <section className={styles.hero}><FluidHero><div className={`${styles.container} ${fluidStyles.contentLayer}`}>
      <SiteNavigation locale="ru" currentUrl="/stack" copyLocale="ru" />
      <div className={styles.heroContent}>
        <Link className={styles.back} href="/ru/stack">← Stack</Link>
        <h1>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
    </div></FluidHero></section>
    {children}
    <SiteFooter locale="ru" currentPath="/stack" copyLocale="ru" />
  </main>;
}

export function DigestArchive({posts}: {posts: DigestPost[]}) {
  return <DigestLayout title="GitHub Digest" lead="Интересные проекты GitHub и их возможности.">
    <section className={`${styles.container} ${styles.archive}`} aria-label="Все публикации дайджеста">
      {posts.length === 0 ? <p>Публикаций пока нет.</p> : <div className={styles.grid}>
        {posts.map(post => <article className={styles.card} key={post.slug}>
          <div className={styles.meta}><time dateTime={post.postedAt}>{dateLabel(post.postedAt)}</time><span>{post.language || 'GitHub'}</span></div>
          <h2><Link href={digestPostPath(post)}>{post.content.title}</Link></h2>
          <p>{post.content.summary}</p>
          <Link className={styles.articleLink} href={digestPostPath(post)}>Подробнее <span aria-hidden="true">↗</span></Link>
        </article>)}
      </div>}
    </section>
  </DigestLayout>;
}

export function DigestArticle({post}: {post: DigestPost}) {
  const url = new URL(digestPostPath(post), 'https://eldiyar.dev').toString();
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.content.title,
    description: post.content.summary,
    datePublished: post.postedAt,
    inLanguage: 'ru',
    mainEntityOfPage: url,
    ...(post.imageUrl ? {image: post.imageUrl} : {}),
    publisher: {'@type': 'Person', name: 'Eldiyar', url: 'https://eldiyar.dev'}
  };
  return <DigestLayout title={post.content.title} lead={post.content.summary}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData).replace(/</g, '\\u003c')}} />
    <article className={`${styles.container} ${styles.article}`}>
      <Link className={styles.articleLink} href="/ru/stack/digest">← Все публикации</Link>
      <div className={styles.articleMeta}><time dateTime={post.postedAt}>{dateLabel(post.postedAt)}</time><span>{post.repoName}</span>{post.language && <span>{post.language}</span>}<span>★ {post.stars.toLocaleString('ru-RU')}</span></div>
      {post.content.benefit && <section><h2>Чем полезен</h2><p>{post.content.benefit}</p></section>}
      {post.content.use_cases.length > 0 && <section><h2>Сценарии использования</h2><ul>{post.content.use_cases.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul></section>}
      {post.content.tags.length > 0 && <div className={styles.tags}>{post.content.tags.map((tag, index) => <span key={`${index}-${tag}`}>{tag}</span>)}</div>}
      <a className={styles.github} href={post.githubUrl} target="_blank" rel="noopener noreferrer">Открыть на GitHub ↗</a>
    </article>
  </DigestLayout>;
}
