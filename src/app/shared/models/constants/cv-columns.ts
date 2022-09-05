import { ColumnItem } from '../interfaces/column-item';
import { Cv } from '../interfaces/cv';

export const CV_COLUMNS: ColumnItem[] = [
  {
    name: 'cvs.actions.name',
    sortOrder: 'ascend',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: Cv, b: Cv) => a.attributes.name.localeCompare(b.attributes.name),
  },
  {
    name: 'cvs.actions.description',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: Cv, b: Cv) => a.attributes.description.localeCompare(b.attributes.description),
  },
];
