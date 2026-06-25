import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuOpen = false;

  constructor(private theme: ThemeService) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  setTheme(theme: 'dark' | 'dark-blue') {
    this.theme.setTheme(theme);
    this.menuOpen = false;
  }
}