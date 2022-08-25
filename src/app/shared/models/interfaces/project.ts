import { ProjectAttributes } from './project-attributes';
import { ResponseObjectStructure } from './response-object-structure';

export interface Project extends ResponseObjectStructure {
  attributes: ProjectAttributes;
}
