import { Project } from '../models/project';

export const PROJECTS: Project[] = [
  {
    id: 'mutant-odyssey',
    title: 'Mutant Odyssey',
    summary:
      'A pixel-art roguelike creature collector. Between runs players return to a hub in the style of classic console RPGs.',
    status: 'in-development',
    tags: ['Godot 4', 'C#', 'Pixel art', 'Roguelike'],
    links: [{ label: 'Follow me!', url: 'https://www.reddit.com/user/BafflingBonk' }],
  },
  {
    id: 'block-game',
    title: 'Block Game',
    summary:
      'A falling-block puzzle game that runs in the browser, with a piece preview, a landing ghost, levels that speed up and a saved best score.',
    status: 'released',
    tags: ['TypeScript', 'Angular'],
    links: [{ label: 'Play it', url: '/block-game' }],
  },
  {
    id: 'website',
    title: 'This website',
    summary:'Playground and portfolio, built with Angular and SCSS: lazy-loaded pages, ',
    status: 'in-development',
    tags: ['Angular', 'TypeScript', 'SCSS', 'GitHub Actions'],
    links: [],
  },
];
