export interface ProfileLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  tagline: string;
  intro: string;
  /** Contact and social links shown on Home and About; leave empty to hide the section. */
  links: ProfileLink[];
}
