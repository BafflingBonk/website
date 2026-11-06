export type ProjectStatus = 'in-development' | 'prototype' | 'released';

export interface ProjectLink {
  label: string;
  /** An internal route (`/block-game`) or a full external URL. */
  url: string;
}

export interface Project {
  /** Unique; used to track list entries. */
  id: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  tags: string[];
  links: ProjectLink[];
}
