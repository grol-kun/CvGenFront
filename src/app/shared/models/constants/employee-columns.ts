import { SearchTypeEnum } from '../emuns/search-type.enum';
import { ColumnItem } from '../interfaces/column-item';
import { UserInfo } from '../interfaces/user-info';

export const EMPLOYEE_COLUMNS: ColumnItem[] = [
  {
    name: 'employees.actions.first_name',
    sortOrder: null,
    searchType: SearchTypeEnum.text,
    sortDirections: ['ascend', 'descend', null],
    fieldName: 'firstName',
    sortFn: (a: UserInfo, b: UserInfo) => a.firstName.localeCompare(b.firstName),
  },
  {
    name: 'employees.actions.last_name',
    sortOrder: 'descend',
    searchType: SearchTypeEnum.text,
    sortDirections: ['ascend', 'descend', null],
    fieldName: 'lastName',
    sortFn: (a: UserInfo, b: UserInfo) => a.lastName.localeCompare(b.lastName),
  },
  {
    name: 'employees.actions.email',
    sortOrder: null,
    searchType: SearchTypeEnum.text,
    sortDirections: ['ascend', 'descend', null],
    fieldName: 'email',
    sortFn: (a: UserInfo, b: UserInfo) => a.email.localeCompare(b.email),
  },
];
