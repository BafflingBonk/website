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
  {
    path: 'monsters',
    loadChildren: () =>
      import('./monsters/monsters.routes')
        .then(m => m.MONSTERS_ROUTES)
  },
  {
    path: 'backgrounds',
    loadChildren: () =>
      import('./backgrounds/backgrounds.routes')
        .then(m => m.BACKGROUNDS_ROUTES)
  }
];