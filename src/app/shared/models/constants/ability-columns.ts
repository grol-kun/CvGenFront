import { ColumnItem } from '../interfaces/column-item';
import { Ability } from '../interfaces/ability';

export const ABILITY_COLUMNS: ColumnItem[] = [
  {
    name: 'Name',
    sortOrder: 'ascend',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: Ability, b: Ability) => a.attributes.name.localeCompare(b.attributes.name),
  },
  {
    name: 'Created At',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: Ability, b: Ability) => a.attributes.createdAt.localeCompare(b.attributes.createdAt),
  },
  {
    name: 'Updated At',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: Ability, b: Ability) => a.attributes.updatedAt.localeCompare(b.attributes.updatedAt),
  },
];
