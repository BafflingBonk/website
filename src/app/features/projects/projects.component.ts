import { Component } from '@angular/core';
import { PROJECTS } from '../../core/data/projects';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';

@Component({
  selector: 'app-projects',
  imports: [ProjectCardComponent],
  template: `
    <section class="page">
      <header class="page-header">
        <span class="eyebrow">Projects</span>
        <h1>Things I build</h1>
        <p>
          Games, tools and experiments, including this site. Some are finished, most are growing.
        </p>
      </header>

      <div class="grid">
        @for (project of projects; track project.id) {
          <app-project-card [project]="project" />
        }
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
      gap: 16px;
    }
  `,
})
export class ProjectsComponent {
  readonly projects = PROJECTS;
}
