import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <app-header />
    <main id="main" class="container" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      flex: 1;
      width: 100%;
      outline: none;
    }

    .skip-link {
      position: absolute;
      left: 16px;
      top: -48px;
      z-index: 200;
      padding: 8px 16px;
      border-radius: 8px;
      background: var(--primary);
      color: var(--on-primary);
    }

    .skip-link:focus {
      top: 12px;
    }
  `,
})
export class AppComponent {}
