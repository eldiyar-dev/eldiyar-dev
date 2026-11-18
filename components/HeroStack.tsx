import Image from 'next/image';
import type {Locale} from '@/lib/i18n';
import {SiteIcon, type iconPaths} from './SiteIllustration';
import styles from './hero-stack.module.css';

const stackLabels: Record<Locale, string> = {
  en: 'Technology stack',
  ru: 'Технологический стек',
  tr: 'Teknoloji yığını',
  ar: 'الحزمة التقنية',
};

const disciplines = [
  ['Backend', 'server'],
  ['Frontend', 'browser'],
  ['Fullstack', 'architecture'],
  ['DevOps', 'launch'],
  ['CI/CD', 'workflow'],
  ['AI', 'brain'],
] as const satisfies readonly [string, keyof typeof iconPaths][];

const technologies = [
  ['Node.js', 'nodejs'],
  ['TypeScript', 'typescript'],
  ['JavaScript', 'javascript'],
  ['React', 'react'],
  ['Next.js', 'nextjs'],
  ['NestJS', 'nestjs'],
  ['Redux', 'redux'],
  ['Bun', 'bun'],
  ['Python', 'python'],
  ['PostgreSQL', 'postgresql'],
  ['Redis', 'redis'],
  ['Apache Kafka', 'apachekafka'],
  ['Docker', 'docker'],
  ['Linux', 'linux'],
  ['GitLab', 'gitlab'],
  ['Jenkins', 'jenkins'],
  ['Grafana', 'grafana'],
  ['Playwright', 'playwright'],
] as const;

export function HeroStack({locale}: {locale: Locale}) {
  return <ul className={styles.stack} aria-label={stackLabels[locale]} role="list">
    {disciplines.map(([label, icon]) => <li key={label}>
      <SiteIcon name={icon} />
      <span dir="ltr">{label}</span>
    </li>)}
    {([['Claude Code', 'claude-color'], ['Codex', 'codex'], ['Qwen', 'qwen-color']] as const).map(([label, icon]) => <li key={label}>
      <Image src={`/tech-stack/${icon}.svg`} width={16} height={16} alt="" />
      <span dir="ltr">{label}</span>
    </li>)}
    {technologies.map(([label, icon]) => <li key={label}>
      <Image src={`/tech-stack/${icon}.svg`} width={16} height={16} alt="" />
      <span dir="ltr">{label}</span>
    </li>)}
  </ul>;
}
