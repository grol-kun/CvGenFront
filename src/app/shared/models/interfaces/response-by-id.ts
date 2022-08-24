import { Skill } from './skill';

export interface ResponseProjectById {
  data: {
    id: number;
    attributes: {
      name: string;
      description: string;
      domain: string;
      from: string;
      to: string;
      internalName: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      skills: Skill[];
    };
  };
}
