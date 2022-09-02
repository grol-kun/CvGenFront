import { Response } from './response';
import { Responsibility } from './responsibility';
import { Skill } from './skill';

export interface Project {
  id: number;
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
    skills: Skill[];
    responsibilities: Response<Responsibility>;
  };
}
