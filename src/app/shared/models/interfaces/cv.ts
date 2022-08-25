import { CVAttributes } from './cv-attributes';
import { ResponseObjectStructure } from './response-object-structure';

export interface CV extends ResponseObjectStructure {
  attributes: CVAttributes;
}
