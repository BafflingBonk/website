import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../data/profile';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container footer-inner">
        <p>© {{ year }} {{ name }}. Built with Angular.</p>
        <nav aria-label="Footer">
          <a routerLink="/projects">Projects</a>
          <a routerLink="/about">About</a>
          @for (link of links; track link.url) {
            <a
              [href]="link.url"
              [attr.target]="link.url.startsWith('http') ? '_blank' : null"
              rel="noopener"
              >{{ link.label }}</a
            >
          }
        </nav>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      margin-top: 48px;
      padding: 24px 0;
      border-top: 1px solid var(--border);
    }

    .footer-inner {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px 24px;
    }

    p {
      font-size: 0.875rem;
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 16px;
      font-size: 0.875rem;
    }

    a {
      color: var(--muted);
      text-decoration: none;
    }

    a:hover {
      color: var(--text);
    }
  `,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly name = PROFILE.name;
  readonly links = PROFILE.links;
}
