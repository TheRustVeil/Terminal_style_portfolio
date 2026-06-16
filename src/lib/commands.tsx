import { me, skills, projects, education, certifications, socials, COMMANDS } from '@/data';

export type OutputLine =
  | { type: 'text'; value: string; className?: string }
  | { type: 'link'; label: string; url: string; className?: string }
  | { type: 'blank' }
  | { type: 'divider' }
  | { type: 'segments'; parts: { text: string; className?: string }[] };

export function processCommand(input: string): OutputLine[] | 'clear' {
  const cmd = input.trim().toLowerCase();

  if (cmd === 'clear') return 'clear';

  switch (cmd) {
    case 'help':
      return helpOutput();
    case 'about':
      return aboutOutput();
    case 'projects':
      return projectsOutput();
    case 'skills':
      return skillsOutput();
    case 'education':
      return educationOutput();
    case 'certifications':
      return certsOutput();
    case 'socials':
      return socialsOutput();
    case 'resume':
      return resumeOutput();
    case 'whoami':
      return [{ type: 'text', value: me.whoami, className: 'text-cyan' }];
    case 'neofetch':
      return neofetchOutput();
    case 'banner':
      return bannerOutput();
    case 'date':
      return dateOutput();
    case 'hack':
      return hackOutput();
    case '':
      return [];
    default:
      return [
        {
          type: 'text',
          value: `command not found: ${cmd}. Type 'help' for available commands.`,
          className: 'text-gray',
        },
      ];
  }
}

export function helpOutput(): OutputLine[] {
  const standard = ['about', 'projects', 'skills', 'education', 'certifications', 'socials', 'resume', 'whoami', 'neofetch', 'banner', 'theme', 'date', 'clear', 'help'];
  const hidden = ['matrix', 'hack'];
  return [
    { type: 'text', value: 'available commands:', className: 'text-green-dim' },
    { type: 'blank' },
    ...standard.map((cmd) => ({
      type: 'text' as const,
      value: `  ${cmd.padEnd(16)}— ${cmdDesc(cmd)}`,
      className: 'text-white',
    })),
    { type: 'blank' },
    { type: 'text', value: '  [?] some commands are hidden. explore...', className: 'text-gray' },
  ];
}

function cmdDesc(cmd: string): string {
  const map: Record<string, string> = {
    about: 'who am I',
    projects: 'things I have built',
    skills: 'my tech stack',
    education: 'academic background',
    certifications: 'courses & certs',
    socials: 'find me online',
    resume: 'full résumé snapshot',
    whoami: 'one-line identity',
    neofetch: 'system info panel',
    banner: 'ascii art banner',
    matrix: 'enter the matrix',
    theme: 'change color theme',
    date: 'current date & time',
    hack: '???',
    clear: 'clear the terminal',
    help: 'show this menu',
  };
  return map[cmd] ?? '';
}

function aboutOutput(): OutputLine[] {
  return [
    { type: 'text', value: '// about', className: 'text-cyan' },
    { type: 'blank' },
    { type: 'text', value: `  ${me.name} — ${me.title}`, className: 'text-green' },
    { type: 'blank' },
    { type: 'text', value: '  MCA student with hands-on experience in Full Stack and Web3 development.' },
    { type: 'text', value: '  Built decentralized applications on Ethereum including smart contracts and' },
    { type: 'text', value: '  Web3 frontends integrated with MetaMask. Strong foundation in DSA, DBMS,' },
    { type: 'text', value: '  Operating Systems, and Computer Networks.' },
  ];
}

function projectsOutput(): OutputLine[] {
  const lines: OutputLine[] = [
    { type: 'text', value: '// projects', className: 'text-cyan' },
  ];
  for (const p of projects) {
    lines.push({ type: 'blank' });
    lines.push({ type: 'text', value: `  [${p.id}] ${p.name}`, className: 'text-yellow' });
    lines.push({ type: 'text', value: `       ${p.tech.join(', ')}`, className: 'text-green-dim' });
    if (p.period) {
      lines.push({ type: 'text', value: `       ${p.period}`, className: 'text-gray' });
    }
    for (const b of p.bullets) {
      lines.push({ type: 'text', value: `       › ${b}` });
    }
    if (p.live) {
      lines.push({ type: 'link', label: `       live   `, url: p.live, className: 'text-cyan' });
    }
    lines.push({ type: 'link', label: `       github `, url: p.github, className: 'text-cyan' });
    lines.push({ type: 'divider' });
  }
  return lines;
}

function skillsOutput(): OutputLine[] {
  const lines: OutputLine[] = [
    { type: 'text', value: '// skills', className: 'text-cyan' },
    { type: 'blank' },
  ];
  for (const [category, items] of Object.entries(skills)) {
    lines.push({
      type: 'text',
      value: `  ${category.padEnd(18)}${items.join(', ')}`,
      className: 'text-white',
    });
  }
  return lines;
}

function educationOutput(): OutputLine[] {
  const lines: OutputLine[] = [
    { type: 'text', value: '// education', className: 'text-cyan' },
  ];
  for (const e of education) {
    lines.push({ type: 'blank' });
    lines.push({ type: 'text', value: `  ${e.degree}`, className: 'text-yellow' });
    lines.push({ type: 'text', value: `  ${e.institution}` });
    lines.push({ type: 'text', value: `  ${e.period}  |  ${e.score}`, className: 'text-green-dim' });
  }
  return lines;
}

function certsOutput(): OutputLine[] {
  return [
    { type: 'text', value: '// certifications', className: 'text-cyan' },
    { type: 'blank' },
    ...certifications.map((c) => ({
      type: 'text' as const,
      value: `  ★ ${c}`,
      className: 'text-yellow',
    })),
  ];
}

function socialsOutput(): OutputLine[] {
  return [
    { type: 'text', value: '// socials', className: 'text-cyan' },
    { type: 'blank' },
    ...socials.map((s) => ({
      type: 'link' as const,
      label: `  ${s.label.padEnd(12)}`,
      url: s.url,
      className: 'text-cyan',
    })),
  ];
}

function resumeOutput(): OutputLine[] {
  return [
    { type: 'text', value: '// resume', className: 'text-cyan' },
    { type: 'blank' },
    { type: 'text', value: `  ${me.name}`, className: 'text-green' },
    { type: 'text', value: `  ${me.title}`, className: 'text-green-dim' },
    { type: 'blank' },
    { type: 'text', value: `  email      ${me.email}`, className: 'text-white' },
    { type: 'text', value: `  phone      ${me.phone}`, className: 'text-white' },
    { type: 'link', label: '  github     ', url: me.github, className: 'text-cyan' },
    { type: 'link', label: '  linkedin   ', url: me.linkedin, className: 'text-cyan' },
    { type: 'blank' },
    { type: 'text', value: '  MCA student with hands-on experience in Full Stack and Web3 development.' },
    { type: 'text', value: '  Ethereum DApp developer · React · Solidity · Node.js · 6+ projects shipped.' },
    { type: 'blank' },
    { type: 'divider' },
    { type: 'link', label: '  download   ', url: '/Nres_updated.pdf', className: 'text-yellow' },
    { type: 'text', value: "  run 'projects'  'skills'  'education' for full details", className: 'text-gray' },
  ];
}

function neofetchOutput(): OutputLine[] {
  const art = [
    '  ╔════════════╗  ',
    '  ║            ║  ',
    '  ║   KARTIK   ║  ',
    '  ║    .DEV    ║  ',
    '  ╠════════════╣  ',
    '  ║    WEB3    ║  ',
    '  ║  BUILDER   ║  ',
    '  ╚════════════╝  ',
    '  ████ ████ ████  ',
    '  ████ ████ ████  ',
    '                  ',
    '                  ',
  ];

  const info: { text: string; className: string }[] = [
    { text: 'kartik@portfolio', className: 'text-cyan' },
    { text: '─────────────────────────────', className: 'text-green-dim' },
    { text: 'OS        Portfolio OS v2.0 LTS', className: 'text-white' },
    { text: 'Kernel    React 19 + Next.js 16', className: 'text-white' },
    { text: 'Shell     terminal.tsx', className: 'text-white' },
    { text: 'Languages TypeScript · Solidity · JS', className: 'text-white' },
    { text: 'Runtime   Node.js / V8 Engine', className: 'text-white' },
    { text: 'GPU       Ethereum EVM (Solidity)', className: 'text-white' },
    { text: 'Projects  6 shipped to production', className: 'text-white' },
    { text: 'Web3      Ethereum · Hardhat · Sepolia', className: 'text-white' },
    { text: 'Status    MCA @ LPU  (2025–2027)', className: 'text-yellow' },
    { text: '■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■', className: 'text-cyan' },
  ];

  const lines: OutputLine[] = [
    { type: 'text', value: '// neofetch', className: 'text-cyan' },
    { type: 'blank' },
  ];

  const rows = Math.max(art.length, info.length);
  for (let i = 0; i < rows; i++) {
    const artText = art[i] ?? '                  ';
    const infoItem = info[i];
    if (infoItem) {
      lines.push({
        type: 'segments',
        parts: [
          { text: artText, className: 'text-green-dim' },
          { text: infoItem.text, className: infoItem.className },
        ],
      });
    } else {
      lines.push({ type: 'text', value: artText, className: 'text-green-dim' });
    }
  }

  return lines;
}

function bannerOutput(): OutputLine[] {
  return [
    { type: 'blank' },
    { type: 'text', value: '  ██╗  ██╗ █████╗ ██████╗ ████████╗██╗██╗  ██╗', className: 'text-green' },
    { type: 'text', value: '  ██║ ██╔╝██╔══██╗██╔══██╗╚══██╔══╝██║██║ ██╔╝', className: 'text-green' },
    { type: 'text', value: '  █████╔╝ ███████║██████╔╝   ██║   ██║█████╔╝ ', className: 'text-green' },
    { type: 'text', value: '  ██╔═██╗ ██╔══██║██╔══██╗   ██║   ██║██╔═██╗ ', className: 'text-cyan' },
    { type: 'text', value: '  ██║  ██╗██║  ██║██║  ██║   ██║   ██║██║  ██╗', className: 'text-cyan' },
    { type: 'text', value: '  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═╝', className: 'text-yellow' },
    { type: 'blank' },
    { type: 'text', value: '  full stack developer  ·  web3 builder  ·  mca student', className: 'text-green-dim' },
    { type: 'text', value: '  "building decentralized futures, one contract at a time"', className: 'text-gray' },
    { type: 'blank' },
  ];
}

function dateOutput(): OutputLine[] {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pad = (n: number) => String(n).padStart(2, '0');
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return [
    {
      type: 'text',
      value: `  ${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}  —  ${time}`,
      className: 'text-cyan',
    },
    { type: 'text', value: `  Timezone: ${zone}`, className: 'text-green-dim' },
  ];
}

function hackOutput(): OutputLine[] {
  return [
    { type: 'text', value: '// initiating exploit protocol...', className: 'text-green' },
    { type: 'blank' },
    { type: 'text', value: '[*] scanning target: kartik.dev:443', className: 'text-green-dim' },
    { type: 'text', value: '[*] port scan → 80 (HTTP)  443 (HTTPS)  22 (SSH)  open', className: 'text-green-dim' },
    { type: 'text', value: '[*] fingerprinting stack... Next.js + React detected', className: 'text-green-dim' },
    { type: 'text', value: '[*] scanning smart contracts on Sepolia testnet...', className: 'text-green-dim' },
    { type: 'text', value: '[!] CVE-2026-LMAO — not real, relax', className: 'text-yellow' },
    { type: 'text', value: '[*] loading payload ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%', className: 'text-green-dim' },
    { type: 'text', value: '[*] establishing encrypted tunnel...', className: 'text-green-dim' },
    { type: 'text', value: '[+] ACCESS GRANTED ✓', className: 'text-green' },
    { type: 'blank' },
    { type: 'text', value: '$ whoami', className: 'text-cyan' },
    { type: 'text', value: '  root@kartik.dev — full stack dev & ethereum hacker', className: 'text-white' },
    { type: 'blank' },
    { type: 'text', value: '$ cat /etc/secret.txt', className: 'text-cyan' },
    { type: 'text', value: '  you found the easter egg! no actual hacking here :)', className: 'text-yellow' },
    { type: 'text', value: '  MCA student by day · Ethereum builder by night', className: 'text-white' },
    { type: 'text', value: '  try: matrix  |  banner  |  theme amber', className: 'text-green-dim' },
  ];
}
