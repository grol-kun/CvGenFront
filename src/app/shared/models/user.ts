import { Language } from './interfaces/language';
import { Skill } from './interfaces/skill';

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  skills: Skill[] | null;
  languages: Language[] | null;
  education: string | null;
  description: string | null;
  firstName: string | null;
  lastName: string | null;
  cvs: string | null;
}
