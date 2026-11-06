import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project, ProjectStatus } from '../../core/models/project';

const STATUS_LABELS: Record<ProjectStatus, string> = {
  'in-development': 'In development',
  prototype: 'Prototype',
  released: 'Playable',
};

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  readonly statusLabel = computed(() => STATUS_LABELS[this.project().status]);

  isInternal(url: string): boolean {
    return url.startsWith('/');
  }
}
