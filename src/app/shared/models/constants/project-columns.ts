import { ColumnItem } from '../interfaces/column-item';
import { Project } from '../interfaces/project';

export const PROJECT_COLUMNS: ColumnItem[] = [
  {
    name: 'projects.actions.name',
    sortOrder: 'ascend',
    searchField: 'attributes.name',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: Project, b: Project) => a.attributes.name.localeCompare(b.attributes.name),
  },
  {
    name: 'projects.actions.from',
    sortOrder: null,
    searchField: 'attributes.from',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: Project, b: Project) => a.attributes.from.localeCompare(b.attributes.from),
  },
  {
    name: 'projects.actions.to',
    sortOrder: null,
    searchField: 'attributes.to',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: Project, b: Project) => a.attributes.to.localeCompare(b.attributes.to),
  },
];
