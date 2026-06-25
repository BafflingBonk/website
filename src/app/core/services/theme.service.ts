import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

type Theme = 'dark' | 'dark-blue';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: Theme = 'dark';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      this.setTheme(saved);
    } else {
      this.setTheme('dark');
    }
  }

  setTheme(theme: Theme) {
    this.currentTheme = theme;

    const html = document.documentElement;

    // remove previous
    this.renderer.removeAttribute(html, 'data-theme');

    // set new
    this.renderer.setAttribute(html, 'data-theme', theme);

    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const next = this.currentTheme === 'dark' ? 'dark-blue' : 'dark';
    this.setTheme(next);
  }

  getTheme() {
    return this.currentTheme;
  }
}