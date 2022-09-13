import { DataProject } from './data-project';
import { Language } from './language';
import { Skill } from './skill';

export interface CvData {
  name: string;
  description: string;
  projects: DataProject | null;
  languages: Language[];
  skills: Skill[];
}
