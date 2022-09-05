import { ColumnItem } from '../interfaces/column-item';
import { UserInfo } from '../interfaces/user-info';

export const EMPLOYEE_COLUMNS: ColumnItem[] = [
  {
    name: 'First Name',
    sortOrder: null,
    searchField: 'firstName',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: UserInfo, b: UserInfo) => a.firstName.localeCompare(b.firstName),
  },
  {
    name: 'Last Name',
    sortOrder: 'descend',
    searchField: 'lastName',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: UserInfo, b: UserInfo) => a.lastName.localeCompare(b.lastName),
  },
  {
    name: 'Email',
    sortOrder: null,
    searchField: 'email',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: UserInfo, b: UserInfo) => a.email.localeCompare(b.email),
  },
];
