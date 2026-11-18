import styles from './marketing.module.css';

export const iconPaths = {
  server: 'M3 4h18v6H3zM3 14h18v6H3zM7 7h.01M7 17h.01',
  browser: 'M3 4h18v16H3zM3 9h18M7 6.5h.01m3 0h.01',
  workflow: 'M3 5h5v5H3zM16 3h5v5h-5zM16 16h5v5h-5zM8 7.5h4v11h4M12 7.5V5.5h4',
  payment: 'M3 7h18v12H3zM3 11h18M7 15h3M16 15h2',
  launch: 'M9 15l-2-2c1-5 5-9 12-9 0 7-4 11-9 12l-1-1ZM8 10H5l-2 4 4 1m6 0v4l-4 2-1-4M14 9h.01M5 18l-2 3',
  chart: 'M4 3v17h17M8 16v-3m5 3V9m5 7V5',
  wave: 'M2 12h3l2-5 3 10 3-13 3 16 2-8h4',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-15v5l3 2',
  folder: 'M3 6h7l2 3h9v11H3V6Z',
  report: 'M5 3h10l4 4v14H5zM14 3v5h5M8 12h8m-8 4h8',
  architecture: 'M12 3 2 8l10 5 10-5-10-5ZM2 12l10 5 10-5M2 16l10 5 10-5',
  shield: 'M12 22s8-3 8-10V6l-8-4-8 4v6c0 7 8 10 8 10Zm-3-10 2 2 4-4',
  database: 'M4 6a8 3 0 1 0 16 0 8 3 0 1 0-16 0Zm0 0v12a8 3 0 0 0 16 0V6M4 12a8 3 0 0 0 16 0',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  brain: 'M9 18a3 3 0 0 1-4-3 3 3 0 0 1 0-5 3 3 0 0 1 4-4 3 3 0 0 1 3-3v18a3 3 0 0 1-3-3Zm6 0a3 3 0 0 0 4-3 3 3 0 0 0 0-5 3 3 0 0 0-4-4 3 3 0 0 0-3-3m3 6c-2 0-3 1-3 3m-3 3c2 0 3 1 3 3',
  send: 'm3 10 18-7-7 18-3-8-8-3Zm8 3L21 3',
  check: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm-4-10 3 3 5-6',
  wallet: 'M4 6h16v14H4zM4 6l13-3v3m3 5h-7v5h7m-4-2.5h.01',
  ledger: 'M5 3h14v18H5zM9 3v18m3-13h4m-4 4h4m-4 4h4',
  cost: 'M12 2v20m4-16H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H7',
  restore: 'M4 11a8 8 0 1 1 2 7M4 5v6h6m2-4v5l3 2',
  task: 'M4 5h5v5H4zM4 14h5v5H4zM13 7.5h7m-7 9h7',
  inbox: 'M3 13l3-8h12l3 8v6H3zM3 13h5l2 3h4l2-3h5',
};

type IconName = keyof typeof iconPaths;

export function SiteIcon({name}: {name: IconName}) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d={iconPaths[name]} />
  </svg>;
}

export function ProcessConnector({direction}: {direction: 'split' | 'merge' | 'checks'}) {
  const checks = direction === 'checks';
  return <div className={styles.junction} data-junction={direction} aria-hidden="true">
    {!checks && <svg className={styles.horizontalJunction} viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
      <path d="M0 50h50M50 25v50m0-50h50M50 75h50" vectorEffect="non-scaling-stroke" />
    </svg>}
    <svg className={styles.verticalJunction} viewBox="0 0 100 40" preserveAspectRatio="none" focusable="false">
      <path d={checks ? 'M16.66 0v20h66.68V0M50 0v40' : 'M50 0v20M25 40V20h50v20'} vectorEffect="non-scaling-stroke" />
    </svg>
    {checks && <svg className={styles.narrowJunction} viewBox="0 0 100 40" preserveAspectRatio="none" focusable="false">
      <path d="M50 0v40" vectorEffect="non-scaling-stroke" />
    </svg>}
  </div>;
}

const motifs: Record<string, [IconName, IconName, IconName, IconName]> = {
  '/': ['architecture', 'workflow', 'payment', 'launch'],
  '/ai-workflow-rescue': ['workflow', 'inbox', 'task', 'report'],
  '/payments-reliability': ['payment', 'send', 'wallet', 'ledger'],
  '/ai-launch-gate': ['launch', 'shield', 'cost', 'restore'],
  '/capabilities': ['architecture', 'wave', 'chart', 'database'],
};

export function SiteIllustration({path}: {path: string}) {
  const [main, ...nodes] = motifs[path] ?? motifs['/'];

  return <div className={styles.illustration} aria-hidden="true">
    <svg viewBox="0 0 400 260" fill="none" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      <g className={styles.draftLines}>
        <path d="M18 34V18h16m332 0h16v16M18 226v16h16m332 0h16v-16" />
        <circle cx="175" cy="130" r="71" strokeDasharray="2 6" />
        <circle cx="175" cy="130" r="92" />
        <path d="M18 130h21M356 130h26M175 18v12m0 200v12" />
      </g>
      <g className={styles.signalLines}>
        <path d="M66 130h64m90 0h37m0-62v124m0-124h51m-51 62h51m-51 62h51" />
        <circle cx="66" cy="130" r="4" />
        <circle cx="257" cy="130" r="4" />
      </g>
      <rect className={styles.coreNode} x="130" y="85" width="90" height="90" rx="16" />
      <g className={styles.coreIcon} transform="translate(151 106) scale(2)">
        <path d={iconPaths[main]} />
      </g>
      {nodes.map((node, index) => <g key={node} transform={`translate(308 ${45 + index * 62})`}>
        <rect className={styles.satellite} width="46" height="46" rx="8" />
        <path className={styles.satelliteIcon} d={iconPaths[node]} transform="translate(11 11)" />
      </g>)}
    </svg>
  </div>;
}
