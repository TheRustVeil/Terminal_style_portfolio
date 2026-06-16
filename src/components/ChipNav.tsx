'use client';

import { COMMANDS, Command } from '@/data';

interface Props {
  active: string;
  onCommand: (cmd: Command) => void;
}

export default function ChipNav({ active, onCommand }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        padding: '12px 16px',
        borderTop: '1px solid #1a3a1a',
      }}
    >
      {COMMANDS.filter((c) => c !== 'help').map((cmd) => (
        <button
          key={cmd}
          className={`chip${active === cmd ? ' active' : ''}`}
          onClick={() => onCommand(cmd)}
        >
          [{cmd}]
        </button>
      ))}
    </div>
  );
}
