import { Project } from '../models/project';

export const PROJECTS: Project[] = [
  {
    id: 'mutant-odyssey',
    title: 'Mutant Odyssey',
    summary:
      'A pixel-art roguelike creature collector. Between runs you return to a persistent hub; ' +
      'on a run you explore rooms, gather a team of mutants and fight turn-based battles ' +
      'in the style of classic console RPGs.',
    status: 'in-development',
    tags: ['Godot 4', 'C#', 'Pixel art', 'Roguelike'],
    links: [],
  },
  {
    id: 'block-game',
    title: 'Block Game',
    summary:
      'A falling-block puzzle game that runs right here in the browser, with a piece preview, ' +
      'a landing ghost, levels that speed up and a saved best score.',
    status: 'released',
    tags: ['TypeScript', 'Angular', 'Game logic'],
    links: [{ label: 'Play it', url: '/block-game' }],
  },
  {
    id: 'website',
    title: 'This website',
    summary:
      'My playground and portfolio, built with Angular and SCSS: lazy-loaded pages, ' +
      'switchable themes and a deployment pipeline that ships every push to my own server.',
    status: 'in-development',
    tags: ['Angular', 'TypeScript', 'SCSS', 'GitHub Actions'],
    links: [],
  },
];
