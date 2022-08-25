import { CV } from './cv';
import { Language } from './language';
import { Skill } from './skill';

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  skills: Skill[];
  languages: Language[];
  education: string;
  description: string;
  firstName: string;
  lastName: string;
  cvs: CV[];
}
