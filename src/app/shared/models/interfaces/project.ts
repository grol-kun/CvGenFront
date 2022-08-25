import { ResponseObjectStructure } from './response-object-structure';

export interface Project extends ResponseObjectStructure {
  attributes: {
    name: string;
    description: string;
    domain: string;
    from: string;
    to: string;
    internalName: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
