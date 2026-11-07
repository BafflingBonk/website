import { Routes } from '@angular/router';

const SITE_NAME = 'BafflingBonk';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: SITE_NAME,
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'projects',
    title: `Projects · ${SITE_NAME}`,
    loadComponent: () =>
      import('./features/projects/projects.component').then((m) => m.ProjectsComponent),
  },
  {
    path: 'mutant-odyssey/palette',
    title: `Mutant Odyssey Palette · ${SITE_NAME}`,
    loadComponent: () =>
      import('./features/palette/palette.component').then((m) => m.PaletteComponent),
  },
  {
    path: 'art',
    title: `Art · ${SITE_NAME}`,
    loadComponent: () => import('./features/art/art.component').then((m) => m.ArtComponent),
  },
  {
    path: 'block-game',
    title: `Block Game · ${SITE_NAME}`,
    loadComponent: () =>
      import('./features/block_game/block-game.component').then((m) => m.BlockGameComponent),
  },
  {
    path: 'about',
    title: `About · ${SITE_NAME}`,
    loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
  },
  // Old addresses that may still be linked or bookmarked.
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: 'not-found',
    title: `Page not found · ${SITE_NAME}`,
    loadComponent: () =>
      import('./features/not_found/not-found.component').then((m) => m.NotFoundComponent),
  },
  { path: '**', redirectTo: 'not-found' },
];
