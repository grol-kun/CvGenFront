import { Skill } from './skill';
import { Pagination } from './pagination';

export interface SkillResponse {
  data: Skill[];
  meta: {
    pagination: Pagination;
  };
}
