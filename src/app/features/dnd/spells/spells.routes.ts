import { Routes } from '@angular/router';

export const SPELLS_ROUTES: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./spell-editor/spell-editor.component')
        .then(m => m.SpellEditorComponent)
  }
];