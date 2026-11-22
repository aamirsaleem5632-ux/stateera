const fs = require('fs');
const path = require('path');

const routes = [
  { route: '/', file: 'src/app/page.tsx' },
  { route: '/explore', file: 'src/app/explore/page.tsx' },
  { route: '/schemes', file: 'src/app/schemes/page.tsx' },
  { route: '/ai-features', file: 'src/app/ai-features/page.tsx' },
  { route: '/community-lab', file: 'src/app/community-lab/page.tsx' },
  { route: '/reports', file: 'src/app/reports/page.tsx' },
  { route: '/simulator', file: 'src/app/simulator/page.tsx' },
  { route: '/glossary', file: 'src/app/glossary/page.tsx' },
  { route: '/faq', file: 'src/app/faq/page.tsx' },
  { route: '/demo/manager', file: 'src/app/demo/manager/page.tsx' },
  { route: '/demo/admin', file: 'src/app/demo/admin/page.tsx' },
  { route: '/wallet', file: 'src/app/wallet/page.tsx' },
  { route: '/how-it-works', file: 'src/app/how-it-works/page.tsx' },
  { route: '/trust', file: 'src/app/trust/page.tsx' },
  { route: '/experts', file: 'src/app/experts/page.tsx' },
  { route: '/dashboard', file: 'src/app/dashboard/page.tsx' },
  { route: '/learn', file: 'src/app/learn/page.tsx' },
  { route: '/governance', file: 'src/app/governance/page.tsx' },
  { route: '/about', file: 'src/app/about/page.tsx' },
  { route: '/support', file: 'src/app/support/page.tsx' },
  { route: '/demo/tenant', file: 'src/app/demo/tenant/page.tsx' },
  { route: '/login', file: 'src/app/login/page.tsx' },
  { route: '/manager', file: 'src/app/manager/page.tsx' },
  { route: '/tenant', file: 'src/app/tenant/page.tsx' },
  { route: '/admin', file: 'src/app/admin/page.tsx' },
  { route: '/property/[id]', file: 'src/app/property/[id]/page.tsx' },
  { route: '/trade', file: 'src/app/trade/page.tsx' },
  { route: '/trade/[id]', file: 'src/app/trade/[id]/page.tsx' },
  { route: '/fees-and-returns', file: 'src/app/fees-and-returns/page.tsx' },
  { route: '/notifications', file: 'src/app/notifications/page.tsx' },
  { route: '/contact', file: 'src/app/contact/page.tsx' },
  { route: '/legal', file: 'src/app/legal/page.tsx' },
  { route: '/legal/privacy', file: 'src/app/legal/privacy/page.tsx' },
  { route: '/legal/terms', file: 'src/app/legal/terms/page.tsx' },
  { route: '/legal/risks', file: 'src/app/legal/risks/page.tsx' },
  { route: '/auth/reset-password', file: 'src/app/auth/reset-password/page.tsx' },
];

console.log('--- AUDITING ALL 36 ROUTES ---');
const findings = [];

for (const r of routes) {
  if (!fs.existsSync(r.file)) {
    findings.push({ route: r.route, status: 'MISSING_FILE', file: r.file });
    console.log(`[MISSING FILE] ${r.route} -> ${r.file}`);
    continue;
  }

  const content = fs.readFileSync(r.file, 'utf8');
  const lines = content.split('\n').length;
  const isPlaceholder = content.toLowerCase().includes('coming soon') || content.toLowerCase().includes('under construction') || lines < 30;

  // Check exported default component
  const defaultExportMatch = content.match(/export\s+default\s+(?:function\s+)?([A-Za-z0-9_]+)?/);
  const componentName = defaultExportMatch ? (defaultExportMatch[1] || 'anonymous') : 'none';

  // Check for suspicious errors or TODOs
  const hasTodo = content.includes('TODO');

  findings.push({
    route: r.route,
    file: r.file,
    lines,
    componentName,
    isPlaceholder,
    hasTodo
  });

  console.log(`[OK] ${r.route.padEnd(25)} | ${lines.toString().padStart(4)} lines | Comp: ${componentName.padEnd(25)} ${isPlaceholder ? '| [WARN: PLACEHOLDER?]' : ''}`);
}

fs.writeFileSync('scripts/routes_audit.json', JSON.stringify(findings, null, 2));
console.log('\nAudit written to scripts/routes_audit.json');
