import { Skill } from './skill';

export interface ProjectBody {
  data: {
    name: string;
    description: string;
    domain: string;
    from: string | Date;
    to: string | Date;
    skills: Skill[];
    internalName: string;
  };
}
