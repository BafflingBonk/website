import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="page not-found">
      <span class="eyebrow">404</span>
      <h1>This page doesn't exist</h1>
      <p>The link may be old, or the page has moved.</p>
      <a class="button" routerLink="/">Back to the home page</a>
    </section>
  `,
  styles: `
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      min-height: 50vh;
      justify-content: center;
    }
  `,
})
export class NotFoundComponent {}
