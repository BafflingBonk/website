export interface Spell {
  id?: string;
  name: string;
  level: number;
  school: string;

  castingTime?: string;
  range?: string;
  components?: string;
  duration?: string;

  description?: string;

  createdBy?: string;
  isPublic?: boolean;
  createdAt?: string;
}