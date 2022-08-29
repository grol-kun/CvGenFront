import { Language } from './language';
import { Project } from './project';
import { Skill } from './skill';

export interface Cv {
  id: number;
  attributes: {
    name: string;
    description: string;
    projects: Project[];
    languages: Language[];
    skills: Skill[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
