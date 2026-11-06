import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ARTWORKS } from '../../core/data/artworks';
import { PROFILE } from '../../core/data/profile';
import { PROJECTS } from '../../core/data/projects';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';

const FEATURED_PROJECT_COUNT = 2;
const FEATURED_ART_COUNT = 4;

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProjectCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly profile = PROFILE;
  readonly projects = PROJECTS.slice(0, FEATURED_PROJECT_COUNT);
  readonly artworks = ARTWORKS.slice(0, FEATURED_ART_COUNT);

  readonly sections = [
    {
      path: '/projects',
      title: 'Projects',
      text: 'Indie games and tools I am building, from first prototype to playable.',
    },
    {
      path: '/art',
      title: 'Art',
      text: 'Pixel art: sprites, objects and backgrounds, many of them made for my games.',
    },
    {
      path: '/block-game',
      title: 'Block Game',
      text: 'A small falling-block puzzle game you can play right here in the browser.',
    },
  ];
}
