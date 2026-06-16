# Kartik Singh — Terminal Portfolio

A hacker-style terminal portfolio website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**. It looks and behaves like a real terminal — complete with a boot sequence, typewriter animation, interactive commands, Matrix rain, and CRT scanline effects.

**Live:** [kartik.dev](https://kartik.dev) &nbsp;|&nbsp; **Author:** [Kartik Singh](https://github.com/TheRustVeil)

---

## What Was Built

A fully interactive terminal emulator running in the browser. Visitors type commands (or click chip buttons) to explore Kartik's portfolio — projects, skills, education, resume, and more. There is no traditional UI; everything is text-based in the style of a Linux terminal.

### Key Features

| Feature | Description |
|---|---|
| Boot sequence | Fake kernel startup messages appear line-by-line on first load |
| Typewriter animation | Every command output animates in line-by-line |
| Tab autocomplete | Partial command → Tab to complete, like a real shell |
| Arrow key history | Up/Down arrows cycle through previously typed commands |
| Matrix rain | Full-screen falling character animation (`matrix` command) |
| Theme switcher | 4 color themes: green, amber, blue, red (`theme [name]`) |
| Pixel art logo | KARTIK SINGH rendered in a 5×7 pixel grid with a glitch effect |
| CRT effects | Scanlines overlay + vignette + smooth theme transitions |
| Chip nav | Clickable command buttons at the bottom of the screen |

### Available Commands

```
about          — who am I
projects       — things I have built
skills         — my tech stack
education      — academic background
certifications — courses & certs
socials        — find me online
resume         — full résumé snapshot
whoami         — one-line identity
neofetch       — system info panel (like Linux neofetch)
banner         — ASCII art banner
theme [name]   — change color theme (green / amber / blue / red)
date           — current date & time
matrix         — enter the matrix (click to exit)
hack           — ??? (easter egg)
clear          — clear the terminal
help           — show all commands
```

---

## How It Was Built

### Tech Stack

- **Next.js 16** — React framework with App Router
- **React 19** — UI component library
- **TypeScript** — all files are `.ts` / `.tsx` (typed JavaScript)
- **Tailwind CSS v4** — utility-first CSS (used minimally; most styling is plain CSS variables)
- **Geist Mono** — monospace font from Vercel for the terminal look
- **pnpm** — package manager

### Architecture

The entire portfolio is a single-page app. There is no backend, no database, and no API calls. All data (projects, skills, education) lives in `src/data/index.ts`.

```
User types command
      ↓
Terminal.tsx (handles input, history, special commands)
      ↓
commands.tsx (returns OutputLine[] for each command)
      ↓
renderLine() (converts OutputLine to JSX and displays it)
```

---

## Main Files Explained

### `src/data/index.ts`
The single source of truth. Contains all personal data as exported TypeScript constants:
- `me` — name, title, email, phone, GitHub, LinkedIn, terminal prompt
- `skills` — tech stack grouped by category
- `projects` — 6 projects with name, tech, bullets, live link, GitHub link
- `education` — 4 degrees/schools with period and score
- `certifications` — list of completed courses
- `socials` — links for GitHub, LinkedIn, email
- `COMMANDS` — the master list of all valid commands (used for autocomplete and chip nav)

**To add a project:** append an object to the `projects` array with the same shape as the existing ones.

---

### `src/lib/commands.tsx`
The brain of the terminal. Exports:
- `OutputLine` type — union of `text | link | blank | divider | segments`. Every command returns an array of these.
- `processCommand(input)` — switch statement that maps a command string to its output lines
- Individual output functions: `aboutOutput()`, `projectsOutput()`, `skillsOutput()`, `neofetchOutput()`, `hackOutput()`, etc.

The `segments` type allows a single line to have multiple colored spans — used by `neofetch` to render ASCII art on the left and system info on the right in different colors.

---

### `src/components/Terminal.tsx`
The main React component. Handles everything interactive:
- **Boot sequence** — on mount, pushes fake kernel log lines one by one via `setTimeout` (100ms each), then appends the welcome/help output
- **History state** — array of `{ command, output }` entries rendered in order
- **Typewriter animation** — when a new command entry is added, a `setInterval` (18ms per line) increments `animLineCount`, gradually revealing lines
- **`submit()` function** — processes each command; intercepts `matrix` and `theme` before calling `processCommand` since they need DOM access
- **`theme` command** — applies CSS custom property overrides directly to `document.documentElement.style`
- **Matrix overlay** — conditionally renders `<MatrixRain />` as a full-screen overlay
- **`onKeyDown`** — handles Enter (submit), Tab (autocomplete), ArrowUp/Down (history navigation)

---

### `src/components/MatrixRain.tsx`
A canvas-based Matrix falling character animation:
- On mount, sizes the canvas to fill the viewport
- Uses `requestAnimationFrame` to draw random characters (Latin + Katakana) falling in columns
- Every frame: fills canvas with a semi-transparent black (creates the fade trail), then draws new characters
- Auto-dismisses after 4 seconds, or immediately on click
- `onDone` callback tells Terminal.tsx to unmount it

---

### `src/components/PixelLogo.tsx`
Renders "KARTIK SINGH" as pixel art using a 5-column × 7-row grid per letter:
- Each letter is defined as a 2D array of `0`s and `1`s in `GLYPHS`
- A CSS grid of 5×5px divs is created per letter; `1` cells get `background-color: var(--green)`, `0` cells are transparent
- The outer wrapper has `className="pixel-logo"` which triggers the glitch animation from CSS

---

### `src/components/ChipNav.tsx`
The clickable command buttons at the bottom:
- Reads all commands from `COMMANDS` (imported from data), filters out `help`
- Each button calls `onCommand(cmd)` which delegates to `Terminal.tsx`'s `submit()`
- The `active` prop highlights the most recently run command

---

### `src/app/globals.css`
All the visual styling:
- CSS custom properties (`--green`, `--cyan`, etc.) on `:root` — changing these changes the entire theme
- `body::after` — CRT scanlines (repeating-linear-gradient overlay, pointer-events: none)
- `body::before` — vignette (radial-gradient darkening the edges)
- `@keyframes glitch` — the pixel logo glitch effect (translateX + drop-shadow in cyan/green)
- `@keyframes blink` — the blinking cursor block
- `.chip` styles — the command button chips with hover/active glow
- `transition` on `*` — makes theme color changes animate smoothly (0.3s)

---

### `src/app/layout.tsx`
Sets up the Geist Mono font and HTML metadata (title, description). Wraps the app in the font class.

### `src/app/page.tsx`
Single line: renders `<Terminal />`.

---

## Download & Run Locally

### Prerequisites
- [Node.js](https://nodejs.org) v18 or later
- [Git](https://git-scm.com)
- Either **npm** (comes with Node) or **pnpm** (`npm install -g pnpm`)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/TheRustVeil/portfolio.git

# 2. Go into the project folder
cd portfolio

# 3. Install dependencies
npm install
# or if using pnpm:
pnpm install

# 4. Start the development server
npm run dev
# or:
pnpm dev

# 5. Open in browser
# Visit http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow the prompts)
vercel
```

Or connect the GitHub repo to [vercel.com](https://vercel.com) for automatic deploys on every push.

---

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css        # All CSS: theme vars, animations, scanlines
│   │   ├── layout.tsx         # Font setup + HTML metadata
│   │   └── page.tsx           # Renders <Terminal />
│   ├── components/
│   │   ├── Terminal.tsx        # Main terminal logic (boot, history, typewriter)
│   │   ├── PixelLogo.tsx       # Pixel art KARTIK SINGH logo
│   │   ├── ChipNav.tsx         # Clickable command buttons
│   │   └── MatrixRain.tsx      # Canvas Matrix rain animation
│   ├── data/
│   │   └── index.ts            # All personal data + COMMANDS list
│   └── lib/
│       └── commands.tsx        # Command handlers, OutputLine type
├── public/
│   └── Nres_updated.pdf        # Resume PDF (for the `resume` command download)
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## Customizing for Yourself

1. **Change personal info** — edit `src/data/index.ts`
2. **Add a project** — append to the `projects` array in `src/data/index.ts`
3. **Add a command** — add the name to `COMMANDS` in `src/data/index.ts`, add a `case` in `processCommand()` in `src/lib/commands.tsx`, write an output function
4. **Change default theme** — edit the CSS variables in `:root` inside `src/app/globals.css`
5. **Replace resume PDF** — drop your PDF into `public/` and update the path in `resumeOutput()` in `src/lib/commands.tsx`
