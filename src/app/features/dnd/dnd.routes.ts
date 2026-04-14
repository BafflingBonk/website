import { Routes } from '@angular/router';

export const DND_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'spells',
    pathMatch: 'full'
  },
  {
    path: 'spells',
    loadChildren: () =>
      import('./spells/spells.routes')
        .then(m => m.SPELLS_ROUTES)
  },
];