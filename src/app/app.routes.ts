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
    path: 'dnd',
    loadChildren: () =>
      import('./features/dnd/dnd.routes')
        .then(m => m.DND_ROUTES)
  }
];