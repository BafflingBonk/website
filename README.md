# Website

BafflingBonk's personal website: a portfolio for potential employers, a showcase for pixel art and indie game projects, a playground for experiments, and a browser block game. Built with Angular 21 (standalone components, signals, lazy-loaded routes) and SCSS, and deployed to a VPS through GitHub Actions on every push to `main`.

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm install
npm start          # ng serve, then open http://localhost:4200
```

The dev server reloads when you change a source file.

| Command         | What it does                                                 |
| --------------- | ------------------------------------------------------------ |
| `npm start`     | Start the dev server on port 4200                            |
| `npm run build` | Production build to `dist/website/browser/`                  |
| `npm run watch` | Development build that rebuilds on changes                   |
| `npm test`      | Run the unit tests once with Vitest (jsdom), or keep watching |

Formatting uses Prettier; the settings are in [.prettierrc](.prettierrc).

## Pages

| Route         | Component                                  | Content                                           |
| ------------- | ------------------------------------------ | ------------------------------------------------- |
| `/`           | `features/home/HomeComponent`              | Intro, section tiles, featured projects, recent art |
| `/projects`   | `features/projects/ProjectsComponent`      | All projects from `core/data/projects.ts`         |
| `/art`        | `features/art/ArtComponent`                | Pixel-art gallery with a lightbox                 |
| `/mutant-odyssey/palette` | `features/palette/PaletteComponent` | Mutant Odyssey's colour palette: ramps, neutrals and a download for Aseprite |
| `/block-game` | `features/block_game/BlockGameComponent`   | The block game                                    |
| `/about`      | `features/about/AboutComponent`            | About the site, focus areas, contact links        |
| `/not-found`  | `features/not_found/NotFoundComponent`     | Shown for every unknown address                   |

Every route is lazy-loaded and sets the browser tab title; see [src/app/app.routes.ts](src/app/app.routes.ts). `/home` redirects to `/`.

### Block game

| Key                 | Action                        |
| ------------------- | ----------------------------- |
| ← / → (or A / D)    | Move left / right             |
| ↑ (or W / X)        | Rotate                        |
| ↓ (or S)            | Soft drop (+1 point per row)  |
| Space               | Hard drop (+2 points per row) |
| P / Esc             | Pause / resume                |
| Enter               | Start, resume or play again   |

On touch screens, on-screen buttons appear below the board. The board is 10 × 20 and pieces come from a "bag", so every piece shows up once in every 7. Clearing 1, 2, 3 or 4 lines at once scores 100, 300, 500 or 800 points times the level. You go up a level every 10 lines and the pieces fall faster. The game pauses when you switch tabs, and the best score is saved in the browser.

The rules live in [block-game.engine.ts](src/app/features/block_game/block-game.engine.ts), a plain TypeScript class with its own tests. The component only handles timing, input and drawing.

## Project structure

```
src/
├── index.html                  # Page shell; applies the saved theme before Angular starts
├── main.ts                     # Bootstrap + router setup
├── app/
│   ├── app.component.ts        # Shell: skip link, header, <main>, footer
│   ├── app.routes.ts           # All routes and page titles
│   ├── core/
│   │   ├── data/               # Site content: profile, projects, artworks
│   │   ├── models/             # Interfaces for that content
│   │   ├── services/           # ThemeService
│   │   ├── header/             # Navigation (collapses to a menu on small screens) + theme picker
│   │   └── footer/
│   ├── shared/
│   │   └── project-card/       # Card used on Home and Projects
│   └── features/
│       ├── home/
│       ├── projects/
│       ├── art/
│       ├── palette/            # Palette page, the .gpl export
│       ├── block_game/         # Engine + component
│       ├── about/
│       └── not_found/
├── styles/
│   ├── abstracts/              # Variables (spacing, fonts, radius), mixins, functions
│   ├── base/                   # Reset, typography, global classes (.page, .card, .button, …)
│   └── themes/                 # dark.scss, dark_blue.scss, light.scss
└── styles.scss                 # Global stylesheet entry
public/
├── art/                        # Gallery images, served at /art/...
└── fonts/                      # Silkscreen and VT323 from Mutant Odyssey (SIL Open Font License)
```

`src/styles` is on the SCSS include path (`stylePreprocessorOptions` in [angular.json](angular.json)), so a component stylesheet can write `@use 'abstracts/variables' as v;` without a relative path.

## Common tasks

### Change the intro or add contact links

Edit [src/app/core/data/profile.ts](src/app/core/data/profile.ts). Links added to `links` show up on Home, About and in the footer; with none, those spots show a placeholder or nothing.

### Add a project

Add an entry to [src/app/core/data/projects.ts](src/app/core/data/projects.ts). `links` can point to a route on this site (`/block-game`) or a full URL. The first two projects are featured on Home.

### Add an artwork

1. Put the image in `public/art/`, for example `public/art/sunset.png`. Pixel art is shown with sharp scaling, so it can be small.
2. Add an entry to [src/app/core/data/artworks.ts](src/app/core/data/artworks.ts) with a unique `id` (a test checks this):

   ```ts
   {
     id: 5,
     title: 'Sunset',
     description: '',
     imageUrl: '/art/sunset.png',
     createdAt: new Date('2026-11-06'),
     updatedAt: new Date('2026-11-06'),
     author: 'BafflingBonk',
   }
   ```

### Change the Mutant Odyssey palette

Edit [src/app/core/data/palettes.ts](src/app/core/data/palettes.ts); the page and the downloadable `.gpl` both come from it. The game keeps the same colours in `assets/palettes/mutant_odyssey.gpl`, so change both. Tests check that every colour is unique.

### Add a theme

Themes are sets of CSS custom properties (`--bg`, `--surface`, `--text`, `--primary`, …). `ThemeService` sets `data-theme` on `<html>` and saves the choice in `localStorage` under `theme`.

1. Copy `src/styles/themes/light.scss` to `<name>.scss`, change the selector to `:root[data-theme='<name>']` and the colours, and add `@use 'themes/<name>';` to `styles.scss`.
2. Add `{ id: '<name>', label: '…' }` to `THEMES` in [theme.service.ts](src/app/core/services/theme.service.ts), add the id to the check in [index.html](src/index.html), and add a swatch colour in [header.component.scss](src/app/core/header/header.component.scss).

### Add a page

```bash
npx ng generate component features/<name>
```

Then add a lazy route with a `title` to [app.routes.ts](src/app/app.routes.ts) and, if it belongs in the navigation, an entry in `NAV_LINKS` in [header.component.ts](src/app/core/header/header.component.ts).

## Deployment

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) runs on every push to `main`. It:

1. installs dependencies, runs the unit tests and a production build,
2. empties `/var/www/site` on the VPS over SSH,
3. copies `dist/website/browser/` into `/var/www/site`.

It needs these repository secrets:

| Secret        | Value                               |
| ------------- | ----------------------------------- |
| `VPS_HOST`    | Hostname or IP of the server        |
| `VPS_SSH_KEY` | Private SSH key for the `root` user |

The routes are client-side, so the web server has to send `index.html` for unknown paths. Otherwise reloading a page such as `/art` returns a 404. With nginx:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
