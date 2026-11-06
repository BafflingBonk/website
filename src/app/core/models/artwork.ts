export interface Artwork {
  /** Unique; used to track gallery entries. */
  id: number;
  title: string;
  description: string;
  /** Path under `public/`, e.g. `/art/mansion.png`. */
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
}
