import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

export const THEMES = [
  { id: 'dark', label: 'Dark' },
  { id: 'dark-blue', label: 'Midnight blue' },
  { id: 'light', label: 'Light' },
] as const;

export type Theme = (typeof THEMES)[number]['id'];

const STORAGE_KEY = 'theme';
const DEFAULT_THEME: Theme = 'dark';

/** Sets `data-theme` on `<html>`; the colours live in `src/styles/themes/`. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly theme = signal<Theme>(readSavedTheme() ?? DEFAULT_THEME);

  constructor() {
    this.apply(this.theme());
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    this.apply(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be blocked (private mode, disabled cookies); the theme still applies for this visit.
    }
  }

  private apply(theme: Theme): void {
    this.document.documentElement.setAttribute('data-theme', theme);
  }
}

function readSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return THEMES.find((theme) => theme.id === saved)?.id ?? null;
  } catch {
    return null;
  }
}
