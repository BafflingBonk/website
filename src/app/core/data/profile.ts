import { Profile } from '../models/profile';

// Public handle only: never put a real name, private email or location on the site.
const HANDLE = 'BafflingBonk';

// Joined at runtime so the plain address isn't in the bundle for simple scrapers to grep.
const EMAIL = ['bafflingbonk.cardinal616', 'passinbox.com'].join('@');

export const PROFILE: Profile = {
  name: HANDLE,
  tagline: 'Developer, pixel artist and indie game maker.',
  intro:
    'This is my corner of the web: the things I build, draw and experiment with. ' +
    'Have a look around, browse the art, or play a round of the block game.',
  links: [
    { label: 'Email', url: `mailto:${EMAIL}` },
    { label: 'Reddit', url: `https://www.reddit.com/user/${HANDLE}` },
    { label: 'Buy me a coffee', url: `https://buymeacoffee.com/${HANDLE}` },
  ],
};
