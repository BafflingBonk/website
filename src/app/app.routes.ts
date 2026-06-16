import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component')
        .then(m => m.HomeComponent)
  },
  {
    path: 'art',
    loadComponent: () =>
      import('./features/art/art.component')
        .then(m => m.ArtComponent)
  },
  {
    path: 'tetris',
    loadChildren: () =>
      import('./features/tetris/tetris.routes')
        .then(m => m.TETRIS_ROUTES)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component')
        .then(m => m.AboutComponent)
  }
];