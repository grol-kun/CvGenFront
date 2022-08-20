import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

export interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<any> | null;
  sortDirections: NzTableSortOrder[];
}
