import { CV } from "./cv";
import { Language } from "./language";
import { Skill } from "./skill";

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
  cvs: CV[] | null;
}
