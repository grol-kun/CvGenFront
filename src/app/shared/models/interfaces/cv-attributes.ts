import { CvUser } from './cv-user';
import { DataProject } from './data-project';
import { Language } from './language';
import { Skill } from './skill';

export interface CvAttributes {
  name: string;
  description: string;
  projects: DataProject;
  languages: Language[];
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  user: CvUser;
}
