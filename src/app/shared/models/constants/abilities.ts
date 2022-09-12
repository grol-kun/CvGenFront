import { AbilityType } from '../interfaces/ability-type';
import { LANGUAGES_SEARCH_STRING } from './languages-search-string';
import { RESPONSIBILITIES_SEARCH_STRING } from './responsibilities-search-string';
import { SKILLS_SEARCH_STRING } from './skills-search-string';

export const ABILITY_TYPES: AbilityType[] = [
  {
    id: 1,
    name: 'entities.labels.skills',
    search: SKILLS_SEARCH_STRING,
  },
  {
    id: 2,
    name: 'entities.labels.languages',
    search: LANGUAGES_SEARCH_STRING,
  },
  {
    id: 3,
    name: 'entities.labels.responsibilities',
    search: RESPONSIBILITIES_SEARCH_STRING,
  },
];
