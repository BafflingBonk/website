import { Routes } from '@angular/router';

export const TETRIS_ROUTES: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./tetris/tetris.component')
        .then(m => m.TetrisComponent)
  }
];