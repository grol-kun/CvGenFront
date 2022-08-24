import { Language } from './language';
import { Project } from './project';
import { ResponseObjectStructure } from './response-object-structure';
import { Skill } from './skill';

export interface CV extends ResponseObjectStructure {
  attributes: {
    name: string;
    description: string;
    projects: Project[];
    languages: Language[];
    skills: Skill[];
  };
}
