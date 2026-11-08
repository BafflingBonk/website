import { Palette } from '../models/palette';

// The colours of Mutant Odyssey; the game keeps them in `assets/palettes/mutant_odyssey.gpl`.
// Nine base colours mixed like paint: shadows towards the dark teal and a near-black, lights
// towards a cream white, muted tones with a slate grey.
export const MUTANT_ODYSSEY_PALETTE: Palette = {
  id: 'mutant-odyssey',
  title: 'Mutant Odyssey',
  ramps: [
    {
      name: 'Purple',
      steps: [
        { name: 'deep', hex: '#14192e', recipe: '1:3 with near-black' },
        { name: 'shadow', hex: '#25274f', recipe: '1:1 with teal' },
        { name: 'dark', hex: '#32255f', recipe: '3:1 with teal' },
        { name: 'base', hex: '#3f236e', recipe: 'base colour', base: true },
        { name: 'light', hex: '#755f8d', recipe: '7:3 with cream' },
        { name: 'highlight', hex: '#ac9bac', recipe: '2:3 with cream' },
      ],
      muted: { name: 'muted', hex: '#484468', recipe: '1:1 with slate grey' },
    },
    {
      name: 'Blue',
      steps: [
        { name: 'deep', hex: '#102236', recipe: '1:3 with near-black' },
        { name: 'shadow', hex: '#1d3960', recipe: '1:1 with teal' },
        { name: 'dark', hex: '#264077', recipe: '3:1 with teal' },
        { name: 'base', hex: '#2f478f', recipe: 'base colour', base: true },
        { name: 'light', hex: '#6a78a4', recipe: '7:3 with cream' },
        { name: 'highlight', hex: '#a5a9ba', recipe: '2:3 with cream' },
      ],
      muted: { name: 'muted', hex: '#405679', recipe: '1:1 with slate grey' },
    },
    {
      name: 'Crimson',
      steps: [
        { name: 'deep', hex: '#2e1425', recipe: '1:3 with near-black' },
        { name: 'shadow', hex: '#5a1d3f', recipe: '1:1 with teal' },
        { name: 'dark', hex: '#821546', recipe: '3:1 with teal' },
        { name: 'base', hex: '#aa0e4d', recipe: 'base colour', base: true },
        { name: 'light', hex: '#c05076', recipe: '7:3 with cream' },
        { name: 'highlight', hex: '#d6939f', recipe: '2:3 with cream' },
      ],
      muted: { name: 'muted', hex: '#7d3a58', recipe: '1:1 with slate grey' },
    },
    {
      name: 'Green',
      steps: [
        { name: 'deep', hex: '#152f1d', recipe: '1:3 with near-black' },
        { name: 'shadow', hex: '#27522d', recipe: '1:1 with teal' },
        { name: 'dark', hex: '#35652c', recipe: '3:1 with teal' },
        { name: 'base', hex: '#43782a', recipe: 'base colour', base: true },
        { name: 'light', hex: '#789b5e', recipe: '7:3 with cream' },
        { name: 'highlight', hex: '#adbd91', recipe: '2:3 with cream' },
      ],
      muted: { name: 'muted', hex: '#4a6f46', recipe: '1:1 with slate grey' },
    },
    {
      name: 'Yellow',
      steps: [
        { name: 'deep', hex: '#444218', recipe: '1:3 with near-black' },
        { name: 'shadow', hex: '#857825', recipe: '1:1 with teal' },
        { name: 'dark', hex: '#c29f1f', recipe: '3:1 with teal' },
        { name: 'base', hex: '#ffc519', recipe: 'base colour', base: true },
        { name: 'light', hex: '#fcd052', recipe: '7:3 with cream' },
        { name: 'highlight', hex: '#f8dc8a', recipe: '2:3 with cream' },
      ],
      muted: { name: 'muted', hex: '#a8953e', recipe: '1:1 with slate grey' },
    },
    {
      name: 'Orange',
      steps: [
        { name: 'deep', hex: '#312116', recipe: '1:3 with near-black' },
        { name: 'shadow', hex: '#60361f', recipe: '1:1 with teal' },
        { name: 'dark', hex: '#8b3b17', recipe: '3:1 with teal' },
        { name: 'base', hex: '#b6400e', recipe: 'base colour', base: true },
        { name: 'light', hex: '#c9734a', recipe: '7:3 with cream' },
        { name: 'highlight', hex: '#dba786', recipe: '2:3 with cream' },
      ],
      muted: { name: 'muted', hex: '#835338', recipe: '1:1 with slate grey' },
    },
    {
      name: 'Brown',
      steps: [
        { name: 'deep', hex: '#20211c', recipe: '1:3 with near-black' },
        { name: 'shadow', hex: '#3d362c', recipe: '1:1 with teal' },
        { name: 'dark', hex: '#573c29', recipe: '3:1 with teal' },
        { name: 'base', hex: '#704127', recipe: 'base colour', base: true },
        { name: 'light', hex: '#98745c', recipe: '7:3 with cream' },
        { name: 'highlight', hex: '#bfa790', recipe: '2:3 with cream' },
      ],
      muted: { name: 'muted', hex: '#605345', recipe: '1:1 with slate grey' },
    },
    {
      name: 'Aqua',
      steps: [
        { name: 'deep', hex: '#153d3c', recipe: '1:3 with near-black' },
        { name: 'shadow', hex: '#286f6c', recipe: '1:1 with teal' },
        { name: 'dark', hex: '#36908a', recipe: '3:1 with teal' },
        { name: 'base', hex: '#45b2a8', recipe: 'base colour', base: true },
        { name: 'light', hex: '#7ac3b6', recipe: '7:3 with cream' },
        { name: 'highlight', hex: '#aed4c4', recipe: '2:3 with cream' },
      ],
      muted: { name: 'muted', hex: '#4b8c85', recipe: '1:1 with slate grey' },
    },
  ],
  neutrals: [
    { name: 'near-black', hex: '#051618', recipe: 'teal 1:1 with black' },
    { name: 'teal', hex: '#0a2b30', recipe: 'base colour', base: true },
    { name: 'slate', hex: '#506562', recipe: 'teal 7:3 with cream' },
    { name: 'fog', hex: '#969e94', recipe: 'teal 2:3 with cream' },
    { name: 'cream', hex: '#f4ebd6', recipe: 'cream white' },
    { name: 'sickly pale', hex: '#c5c49b', recipe: 'cream 3 : yellow shadow 1 : green light 1' },
  ],
};
