# Portfolio Build Progress

## User Info (from resume)
- **Name:** Kartik Singh
- **Title:** Full Stack Developer | React | Node.js | JavaScript
- **Email:** kartiksingh379410@gmail.com
- **Phone:** +91-7500379410
- **LinkedIn:** https://www.linkedin.com/in/kartik-singh-359766238/
- **GitHub:** https://github.com/TheRustVeil

## Reference Design
- Terminal-style portfolio (like malhar-portfolio-neon.vercel.app)
- Black background, neon green monospace font
- Pixel art name logo (KARTIK SINGH) using block characters
- Commands: about, projects, skills, education, certifications, socials, whoami, clear, help
- Clickable chip buttons at the bottom for navigation
- Prompt style: guest@kartik.dev:~$

---

## Files Created

| File | Status | Notes |
|------|--------|-------|
| `src/data/index.ts` | ✅ Done | All resume + GitHub data |
| `src/app/globals.css` | ✅ Done | Neon green terminal theme |
| `src/app/layout.tsx` | ✅ Done | Geist Mono font, metadata |
| `src/app/page.tsx` | ✅ Done | Renders Terminal |
| `src/components/PixelLogo.tsx` | ✅ Done | Pixel art KARTIK SINGH logo |
| `src/components/Terminal.tsx` | ✅ Done | Full terminal with history, arrow keys |
| `src/components/ChipNav.tsx` | ✅ Done | Bottom clickable chips |
| `src/lib/commands.tsx` | ✅ Done | All command handlers |
| `.npmrc` | ✅ Done | `shamefully-hoist=true` |
| `pnpm-workspace.yaml` | ✅ Done | Build config for sharp/unrs-resolver |

---

## GitHub Repos Fetched (TheRustVeil)
All 6 projects added to `src/data/index.ts`:
1. Crowdfunding DApp — Solidity, Hardhat, React, Ethers.js
2. Crypto Market Dashboard — React, Vite, CoinGecko API
3. Shared Wallet Contract — Solidity, Hardhat, Sepolia
4. ERC20 Token Sale — Solidity, Hardhat, TypeScript, Viem
5. Counter DApp — Solidity, React, Ethers.js
6. Notes App — React

---

## BLOCKER — Dev Server Not Running Yet

**Problem:** pnpm on Windows uses symlinks/junctions for transitive deps. Turbopack (Next.js 16's only bundler) can't resolve `postcss`'s internal modules (`./container`) via pnpm's virtual store.

**What was tried:**
- `pnpm install --ignore-scripts` + `pnpm rebuild` → PostCSS symlink still not in root
- `node-linker=hoisted` in `.npmrc` → didn't hoist transitive deps
- `shamefully-hoist=true` in `.npmrc` → still not hoisting postcss to root
- Deleted lockfile and reinstalled multiple times

**Next steps to fix (pick up here):**
1. Check if a parent `.npmrc` (at `d:\Projject\.npmrc`) is overriding settings
2. OR: Try `pnpm install` (with scripts enabled) using pnpm's interactive approve — run manually in your terminal and select `sharp` + `unrs-resolver`
3. OR: Switch to `npm install` instead of pnpm (simplest fix — just rename `.npmrc`, delete `pnpm-lock.yaml`, run `npm install`)
4. Once dev server starts at `localhost:3000`, all code is ready and should display the terminal portfolio

**All application code is complete.** The only remaining issue is the dependency install/dev server startup.

---

## Build Status
- [x] Folder structure decided (flat Next.js)
- [x] Project scaffolded (Next.js 16 + Tailwind v4 + TypeScript)
- [x] GitHub repos fetched and added to data
- [x] All source files written (data, components, commands, styling)
- [ ] Dev server running (BLOCKED — pnpm/Turbopack/Windows symlink issue)
- [ ] Deployed to Vercel
