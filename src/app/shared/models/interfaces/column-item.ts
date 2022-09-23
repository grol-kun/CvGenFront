import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { SearchType } from '../types/search-type';
export interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<any> | null;
  sortDirections: NzTableSortOrder[];
  searchType: SearchType;
  fieldName: string;
}
