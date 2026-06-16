'use client';

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { me, COMMANDS, Command } from '@/data';
import { processCommand, helpOutput, OutputLine } from '@/lib/commands';
import PixelLogo from './PixelLogo';
import ChipNav from './ChipNav';
import MatrixRain from './MatrixRain';

interface HistoryEntry {
  command: string;
  output: OutputLine[];
}

const THEMES: Record<string, Record<string, string>> = {
  green: { '--green': '#00ff41', '--green-dim': '#00cc33', '--green-muted': '#004d14', '--cyan': '#00e5ff', '--yellow': '#ffd700' },
  amber: { '--green': '#ffb000', '--green-dim': '#cc8800', '--green-muted': '#4d2e00', '--cyan': '#ffdd57', '--yellow': '#ff8c00' },
  blue:  { '--green': '#00bfff', '--green-dim': '#0099cc', '--green-muted': '#003d4d', '--cyan': '#7df9ff', '--yellow': '#00ff7f' },
  red:   { '--green': '#ff4040', '--green-dim': '#cc2020', '--green-muted': '#4d0000', '--cyan': '#ff9b9b', '--yellow': '#ffaa00' },
};

const BOOT_LINES: OutputLine[] = [
  { type: 'text', value: '[  0.001] Portfolio kernel v2.0 initializing...', className: 'text-green-dim' },
  { type: 'text', value: '[  0.052] Loading profile: kartik@portfolio', className: 'text-green-dim' },
  { type: 'text', value: '[  0.128] Mounting /home/kartik.dev ... OK', className: 'text-green-dim' },
  { type: 'text', value: '[  0.201] Starting terminal emulator ... OK', className: 'text-green-dim' },
  { type: 'text', value: '[  0.312] Importing Web3 modules: ethereum · solidity · hardhat', className: 'text-green-dim' },
  { type: 'text', value: '[  0.350] All systems nominal. Welcome, guest.', className: 'text-green' },
];

const WELCOME_OUTPUT: OutputLine[] = [
  { type: 'blank' },
  { type: 'text', value: `${me.name} — ${me.title}`, className: 'text-cyan' },
  { type: 'text', value: "Type 'help' or click a chip below. Tab to autocomplete." },
  { type: 'blank' },
  ...helpOutput(),
];

function renderLine(line: OutputLine, idx: number) {
  if (line.type === 'blank') return <div key={idx} style={{ height: 6 }} />;
  if (line.type === 'divider')
    return <div key={idx} style={{ borderTop: '1px solid #1a3a1a', margin: '8px 0' }} />;
  if (line.type === 'segments')
    return (
      <div key={idx}>
        {line.parts.map((p, i) => (
          <span key={i} className={p.className}>{p.text}</span>
        ))}
      </div>
    );
  if (line.type === 'link')
    return (
      <div key={idx}>
        <span className={line.className}>{line.label}</span>
        <a
          href={line.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan"
          style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}
        >
          {line.url.replace('mailto:', '')}
        </a>
      </div>
    );
  return (
    <div key={idx} className={line.className ?? 'text-green-dim'}>
      {line.value}
    </div>
  );
}

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [activeChip, setActiveChip] = useState('');
  const [showMatrix, setShowMatrix] = useState(false);
  const [animEntryIdx, setAnimEntryIdx] = useState(-1);
  const [animLineCount, setAnimLineCount] = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const animTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Boot sequence on mount
  useEffect(() => {
    setHistory([{ command: '', output: [] }]);
    let alive = true;
    const tids: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      const tid = setTimeout(() => {
        if (!alive) return;
        setHistory(() => [{
          command: '',
          output: BOOT_LINES.slice(0, i + 1),
        }]);
      }, 80 + i * 100);
      tids.push(tid);
    });

    const welcomeTid = setTimeout(() => {
      if (!alive) return;
      setHistory([{ command: '', output: [...BOOT_LINES, ...WELCOME_OUTPUT] }]);
    }, 80 + BOOT_LINES.length * 100 + 350);
    tids.push(welcomeTid);

    return () => {
      alive = false;
      tids.forEach(clearTimeout);
    };
  }, []);

  // Typewriter animation for new command outputs
  useEffect(() => {
    if (history.length === 0) return;
    const lastIdx = history.length - 1;
    const entry = history[lastIdx];
    if (!entry.command || entry.output.length === 0) return;

    if (animTimerRef.current) clearInterval(animTimerRef.current);
    setAnimEntryIdx(lastIdx);
    setAnimLineCount(1);

    let count = 1;
    animTimerRef.current = setInterval(() => {
      count++;
      setAnimLineCount(count);
      if (count >= entry.output.length) {
        clearInterval(animTimerRef.current!);
        animTimerRef.current = null;
        setAnimEntryIdx(-1);
      }
    }, 18);

    return () => {
      if (animTimerRef.current) clearInterval(animTimerRef.current);
    };
  }, [history.length]);

  // Scroll to bottom on history change or animation tick
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, animLineCount]);

  const addToHistory = useCallback((cmd: string, output: OutputLine[]) => {
    setHistory(h => [...h, { command: cmd, output }]);
    if (cmd.trim()) {
      setActiveChip(cmd.trim().toLowerCase().split(/\s+/)[0]);
      setCmdHistory(h => [cmd, ...h]);
    }
    setInput('');
    setHistIdx(-1);
  }, []);

  const submit = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();

      if (trimmed === 'matrix') {
        setShowMatrix(true);
        addToHistory(cmd, [{ type: 'text', value: '// matrix protocol initiated... click anywhere to exit', className: 'text-green' }]);
        return;
      }

      if (trimmed.startsWith('theme')) {
        const name = trimmed.split(/\s+/)[1] ?? '';
        let output: OutputLine[];
        if (THEMES[name]) {
          const root = document.documentElement;
          Object.entries(THEMES[name]).forEach(([k, v]) => root.style.setProperty(k, v));
          output = [{ type: 'text', value: `// theme applied: ${name}`, className: 'text-green' }];
        } else {
          output = [
            { type: 'text', value: '// available themes:', className: 'text-cyan' },
            { type: 'text', value: '  green (default)  ·  amber  ·  blue  ·  red', className: 'text-white' },
            { type: 'text', value: '  usage: theme [name]  e.g. theme amber', className: 'text-green-dim' },
          ];
        }
        addToHistory(cmd, output);
        return;
      }

      const result = processCommand(cmd);
      if (result === 'clear') {
        setHistory([]);
        setActiveChip('');
        setInput('');
        setHistIdx(-1);
      } else {
        addToHistory(cmd, result);
      }
    },
    [addToHistory]
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (!partial) return;
      const matches = (COMMANDS as readonly string[]).filter((c) => c.startsWith(partial));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory(h => [
          ...h,
          { command: '', output: [{ type: 'text', value: '  ' + matches.join('    '), className: 'text-green-dim' }] },
        ]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : (cmdHistory[next] ?? ''));
    }
  };

  const onChip = (cmd: Command) => {
    submit(cmd);
    inputRef.current?.focus();
  };

  return (
    <>
      {showMatrix && <MatrixRain onDone={() => setShowMatrix(false)} />}

      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Scrollable output */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 8px' }}>
          <PixelLogo />

          {history.map((entry, ei) => {
            const isAnimating = ei === animEntryIdx;
            const lines = isAnimating ? entry.output.slice(0, animLineCount) : entry.output;
            return (
              <div key={ei}>
                {entry.command && (
                  <div style={{ marginTop: 8 }}>
                    <span className="text-green-dim">{me.prompt} </span>
                    <span className="text-green">{entry.command}</span>
                  </div>
                )}
                <div style={{ marginTop: 4 }}>
                  {lines.map((line, li) => renderLine(line, li))}
                  {isAnimating && (
                    <span className="blink text-green" style={{ userSelect: 'none' }}>▋</span>
                  )}
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>

        {/* Fixed bottom */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 20px', gap: 8 }}>
            <span className="text-green-dim" style={{ whiteSpace: 'nowrap' }}>{me.prompt}</span>
            <input
              ref={inputRef}
              className="cmd-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />
            <span className="blink text-green" style={{ userSelect: 'none' }}>▋</span>
          </div>
          <ChipNav active={activeChip} onCommand={onChip} />
        </div>
      </div>
    </>
  );
}
