import { Language } from './language';
import { Project } from './project';
import { Skill } from './skill';

export interface CVAttributes {
  name: string;
  description: string;
  projects: Project[];
  languages: Language[];
  skills: Skill[];
}
