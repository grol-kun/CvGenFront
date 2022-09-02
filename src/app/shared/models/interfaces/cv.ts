import { DataProject } from './data-project';
import { Language } from './language';
import { Skill } from './skill';

export interface Cv {
  id: number;
  attributes: {
    name: string;
    description: string;
    projects: DataProject | null;
    languages: Language[];
    skills: Skill[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
