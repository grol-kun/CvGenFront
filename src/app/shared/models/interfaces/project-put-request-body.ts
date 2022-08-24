import { Skill } from './skill';

export interface ProjectPutRequestBody {
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
