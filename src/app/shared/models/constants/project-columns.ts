import { SearchTypeEnum } from '../emuns/search-type.enum';
import { ColumnItem } from '../interfaces/column-item';
import { Project } from '../interfaces/project';

export const PROJECT_COLUMNS: ColumnItem[] = [
  {
    name: 'projects.actions.name',
    sortOrder: 'ascend',
    searchType: SearchTypeEnum.text,
    sortDirections: ['ascend', 'descend', null],
    fieldName: 'attributes.name',
    sortFn: (a: Project, b: Project) => a.attributes.name.localeCompare(b.attributes.name),
  },
  {
    name: 'projects.actions.from',
    sortOrder: null,
    searchType: SearchTypeEnum.date,
    sortDirections: ['ascend', 'descend', null],
    fieldName: 'attributes.from',
    sortFn: (a: Project, b: Project) => a.attributes.from.localeCompare(b.attributes.from),
  },
  {
    name: 'projects.actions.to',
    sortOrder: null,
    searchType: SearchTypeEnum.date,
    sortDirections: ['ascend', 'descend', null],
    fieldName: 'attributes.to',
    sortFn: (a: Project, b: Project) => a.attributes.to.localeCompare(b.attributes.to),
  },
];
