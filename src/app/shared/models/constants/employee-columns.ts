import { ColumnItem } from '../interfaces/column-item';
import { UserInfo } from '../interfaces/user-info';

export const EMPLOYEE_COLUMNS: ColumnItem[] = [
  {
    name: 'employees.actions.first_name',
    sortOrder: null,
    searchField: 'firstName',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: UserInfo, b: UserInfo) => a.firstName.localeCompare(b.firstName),
  },
  {
    name: 'employees.actions.last_name',
    sortOrder: 'descend',
    searchField: 'lastName',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: UserInfo, b: UserInfo) => a.lastName.localeCompare(b.lastName),
  },
  {
    name: 'employees.actions.email',
    sortOrder: null,
    searchField: 'email',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: UserInfo, b: UserInfo) => a.email.localeCompare(b.email),
  },
];
