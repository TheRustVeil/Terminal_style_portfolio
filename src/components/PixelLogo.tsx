'use client';

const GLYPHS: Record<string, number[][]> = {
  K: [
    [1,0,0,0,1],
    [1,0,0,1,0],
    [1,0,1,0,0],
    [1,1,0,0,0],
    [1,0,1,0,0],
    [1,0,0,1,0],
    [1,0,0,0,1],
  ],
  A: [
    [0,1,1,0,0],
    [1,0,0,1,0],
    [1,0,0,1,0],
    [1,1,1,1,0],
    [1,0,0,1,0],
    [1,0,0,1,0],
    [1,0,0,1,0],
  ],
  R: [
    [1,1,1,0,0],
    [1,0,0,1,0],
    [1,0,0,1,0],
    [1,1,1,0,0],
    [1,0,1,0,0],
    [1,0,0,1,0],
    [1,0,0,0,1],
  ],
  T: [
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
  ],
  I: [
    [1,1,1,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [1,1,1,0,0],
  ],
  S: [
    [0,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [0,1,1,0,0],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,1,1,0,0],
  ],
  N: [
    [1,0,0,0,1],
    [1,1,0,0,1],
    [1,0,1,0,1],
    [1,0,0,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
  ],
  G: [
    [0,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,1,1,0],
    [1,0,0,1,0],
    [1,0,0,1,0],
    [0,1,1,0,0],
  ],
  H: [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
  ],
  ' ': Array(7).fill([0,0,0]),
};

const PIXEL = 5;
const GAP = 2;
const ROWS = 7;
const COLS = 5;

export default function PixelLogo() {
  const letters = ['K','A','R','T','I','K',' ','S','I','N','G','H'];

  return (
    <div className="pixel-logo" style={{ display: 'flex', gap: GAP, marginBottom: 16 }}>
      {letters.map((letter, li) => {
        const glyph = GLYPHS[letter] ?? GLYPHS[' '];
        const colCount = letter === ' ' ? 3 : COLS;
        return (
          <div
            key={li}
            style={{ display: 'grid', gridTemplateColumns: `repeat(${colCount}, ${PIXEL}px)`, gap: 1 }}
          >
            {Array.from({ length: ROWS }, (_, r) =>
              Array.from({ length: colCount }, (_, c) => (
                <div
                  key={`${r}-${c}`}
                  style={{
                    width: PIXEL,
                    height: PIXEL,
                    backgroundColor: glyph[r]?.[c] ? 'var(--green)' : 'transparent',
                  }}
                />
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}
