import { ColumnItem } from '../interfaces/column-item';
import { UserInfo } from '../interfaces/user-info';

export const EMPLOYEE_COLUMNS: ColumnItem[] = [
  {
    name: 'First Name',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: UserInfo, b: UserInfo) => a.firstName.localeCompare(b.firstName),
  },
  {
    name: 'Last Name',
    sortOrder: 'descend',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: UserInfo, b: UserInfo) => a.lastName.localeCompare(b.lastName),
  },
  {
    name: 'Email',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: UserInfo, b: UserInfo) => a.email.localeCompare(b.email),
  },
];
