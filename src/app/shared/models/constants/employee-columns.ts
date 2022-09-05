import { ColumnItem } from '../interfaces/column-item';
import { UserInfo } from '../interfaces/user-info';

export const EMPLOYEE_COLUMNS: ColumnItem[] = [
  {
    name: 'employees.actions.first_name',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: UserInfo, b: UserInfo) => a.firstName.localeCompare(b.firstName),
  },
  {
    name: 'employees.actions.last_name',
    sortOrder: 'descend',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: UserInfo, b: UserInfo) => a.lastName.localeCompare(b.lastName),
  },
  {
    name: 'employees.actions.email',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: UserInfo, b: UserInfo) => a.email.localeCompare(b.email),
  },
];
