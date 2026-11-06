import { Component, ElementRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { PROFILE } from '../data/profile';
import { THEMES, Theme, ThemeService } from '../services/theme.service';

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Art', path: '/art' },
  { label: 'Block Game', path: '/block-game' },
  { label: 'About', path: '/about' },
];

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeMenus()',
  },
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly siteName = PROFILE.name;
  readonly links = NAV_LINKS;
  readonly themes = THEMES;
  readonly theme = this.themeService.theme;
  readonly navOpen = signal(false);
  readonly themeMenuOpen = signal(false);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenus());
  }

  toggleNav(): void {
    this.navOpen.update((open) => !open);
    this.themeMenuOpen.set(false);
  }

  toggleThemeMenu(): void {
    this.themeMenuOpen.update((open) => !open);
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
    this.themeMenuOpen.set(false);
  }

  closeMenus(): void {
    this.navOpen.set(false);
    this.themeMenuOpen.set(false);
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.element.nativeElement.contains(event.target as Node)) {
      this.closeMenus();
    }
  }
}
