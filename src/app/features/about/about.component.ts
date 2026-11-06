import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../../core/data/profile';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly profile = PROFILE;

  readonly focusAreas = [
    {
      title: 'Web development',
      text: 'Building sites and small apps with Angular and TypeScript, like this one, from the first component to automated deployment.',
    },
    {
      title: 'Game development',
      text: 'Designing and programming indie games in Godot with C#: systems, UI and the tooling around them.',
    },
    {
      title: 'Pixel art',
      text: 'Drawing sprites, objects and backgrounds, often for my own games.',
    },
  ];
}
