# Website — project notes for Claude

BafflingBonk's private website (Angular 21, standalone components, signals, SCSS), deployed to a VPS on every push to `main`. It has four jobs:

1. **Playground:** a place to try out ideas, tools and techniques.
2. **Portfolio for employers:** a link a potential employer can open to see who BafflingBonk is and what they can do.
3. **Showcase:** art (`/art`) and indie dev projects (`/projects`, e.g. Mutant Odyssey, a Godot/C# game in `c:\dev\Games\Mutant Odyssey`).
4. **Games to play in the browser**, starting with the block game (`/block-game`).

Setup, commands, content workflows and deployment: `README.md`.

## Design direction

- **Employers will read it.** Anything public (pages, text, navigation, console) must look finished and work on desktop and phone (check at ~390 px wide) in every theme. Experiments are welcome but go on their own route and must not break or clutter the main pages.
- **Never call the block game "Tetris".** That name is a trademark. Don't use it, or "tetromino", in UI text, page titles, routes, file or class names, comments, commits or metadata. Don't copy the official look, music or logo either. Generic mechanics (falling pieces, line clears) are fine. Its name is "Block Game" (folder `block_game`, route `/block-game`).
- **Content is data, not markup.** Profile, projects and artworks are typed entries in `src/app/core/data/`, rendered by one template each. Adding one means adding an entry. Never invent facts about the owner (jobs, skills, contacts); leave the field empty so the UI hides it, and ask.
- **Privacy: the public identity is the handle "BafflingBonk" only.** Never put the owner's real name, a private email address, a location or other personal data on the site, in the repo (code, docs, comments, commit messages) or in metadata. The GitHub repo is public. The only contact address is the one in `core/data/profile.ts`.
- Keep it light: no UI library or state management library unless asked. Angular and SCSS are enough.

## Working rules

- Read the component (`.ts`, `.html`, `.scss`) and its route before you edit. Make the smallest change that works and reuse existing patterns and global classes. Don't restructure unless asked.
- Keep the style of the file you edit.
- When a change alters setup, routes, content workflow or deployment, update `README.md` in the same change.
- Never edit `dist/`, `.angular/` or `node_modules/`.
- Commit or push only when asked. A push to `main` deploys to the live site.
- This file holds only what's needed to work on the project. No test results or session notes here.

## Build & check

- `npm start` (port 4200), `npm run build` (production, `dist/website/browser/`), `npm test -- --watch=false` (Vitest + jsdom through `ng test`; globals from `vitest/globals`, no Jasmine). CI runs the tests before every deploy, so a failing test blocks the deploy.
- After a change, run the build and the tests; either failing means the change isn't done. Look at UI changes in a browser at desktop and phone width.
- Budgets in `angular.json`: initial bundle warns at 500 kB; a component stylesheet warns at 4 kB and fails at 8 kB, so shared styles go into `src/styles/`.

## Architecture

- **Routing:** every page is lazy-loaded from `src/app/app.routes.ts` with a `title` (`<Page> · BafflingBonk`). Unknown paths redirect to `/not-found`. Navigation entries are `NAV_LINKS` in `core/header/header.component.ts`.
- **Folders:** `core/` holds app-wide things (header, footer, `data/`, `models/`, `services/`); `shared/` holds reusable components (`ProjectCardComponent`); `features/<name>/` holds one page or game.
- **Themes:** `ThemeService` (signal `theme`) sets `data-theme` on `<html>` and saves it in `localStorage` (`theme`); the inline script in `index.html` applies it before boot. Each theme in `src/styles/themes/` defines the same custom properties: `--bg`, `--surface`, `--surface-raised`, `--border`, `--text`, `--muted`, `--primary`, `--primary-hover`, `--on-primary`, `--accent`, `--danger`, `--shadow-sm`, `--shadow-md`, `--overlay`. Components use these, never hard-coded colours. Exceptions: things that must look the same in every theme (the game board and pieces, lightbox text, theme swatches). A new theme needs its file, a `@use` in `styles.scss`, an entry in `THEMES`, the id in `index.html` and a swatch.
- **Styles:** `src/styles` is on the include path: `@use 'abstracts/variables' as v;` and `@use 'abstracts/mixins' as m;`. Use the spacing/radius/font variables and the mixins (`respond(sm|md|lg)`, `card`, `flex-center`, `flex-column`, `focus-ring`, `pixelated`). Global classes in `base/global.scss`: `.page`, `.page-header`, `.eyebrow`, `.card`, `.button` (+ `.button--secondary`), `.tag`, `.visually-hidden`. A routed page's root is `<section class="page">` with a `.page-header`.
- **Images:** `public/` is served from the site root (`public/art/x.png` → `/art/x.png`). Pixel art uses the `pixelated` mixin.
- **Block game:** `BlockGameEngine` (`block-game.engine.ts`) is plain TypeScript: board, pieces, bag randomiser, scoring, levels, states `ready | running | paused | over`. It takes an injectable `random` for tests and has no timers or DOM. `BlockGameComponent` owns the gravity `setTimeout` (re-read `getTickMs()` each tick), keyboard and touch input, rendering through a `frame` signal, the best score (`localStorage` key `block-game-best`) and pausing on tab switch. Game rules go into the engine with a test in `block-game.engine.spec.ts`. The component takes over arrow keys and Space only while a game is running.

## Conventions

- Standalone components (no `standalone: true`, it's the default), selector prefix `app-`, `inject()` instead of constructor injection, `input()` / `signal()` / `computed()` for state, `host: {}` instead of `@HostListener`. Prefer `templateUrl` + `styleUrl` files; small pages may use inline templates and styles.
- Templates use `@if` / `@for` / `@switch`, never `*ngIf` / `*ngFor`. Every `@for` has a `track`.
- TypeScript is strict (`strict`, `strictTemplates`, …). No `any`; type content with an interface in `core/models/`.
- `localStorage` access is wrapped in `try/catch` (it can be blocked); the site must work without it.
- Accessibility: interactive elements are `<button>` or `<a>`, icons get a `visually-hidden` label or `aria-label`, dialogs close with Escape, and keyboard focus stays visible.
- Prettier: single quotes, print width 100. EditorConfig: 2 spaces, UTF-8, final newline.
- Feature folders snake_case (`block_game`), file names kebab-case (`block-game.component.ts`), classes PascalCase with their suffix, routes kebab-case.
- Comments explain _why_, never what the next line does.

## Known issues (unresolved)

- The live server's nginx config isn't in the repo. Without an `index.html` fallback, reloading any page except `/` returns a 404 (see `README.md`).
- `favicon.ico` is still the Angular default.
- All commits are authored as BafflingBonk with GitHub's no-reply address (history rewritten 2026-11-06). Keep it that way: never commit under another identity.
