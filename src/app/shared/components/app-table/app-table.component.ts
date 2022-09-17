import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { DataTypeEnum } from '../../models/emuns/data-type.enum';
import { SearchTypeEnum } from '../../models/emuns/search-type.enum';
import { ColumnItem } from '../../models/interfaces/column-item';
import { Datatype } from '../../models/types/data-type';

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
})
export class AppTableComponent implements OnInit {
  @Input() listOfColumns: ColumnItem[] = [];
  @Input() data: any[] | null = null;
  @Input() datatype!: Datatype;

  @Output() deleteEntity = new EventEmitter<number>();

  searchTypeEnum = SearchTypeEnum;
  dataTypeEnum = DataTypeEnum;
  searchField = '';
  searchData: string | Date[] = '';
  searchControl = new FormControl<string>('');
  searchDateContorl = new FormControl<Date[]>([]);

  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initSearch();
  }

  initSearch() {
    this.searchControl.valueChanges.pipe(debounceTime(200), takeUntil(this.destroy$)).subscribe((data) => {
      this.searchData = data ?? '';
      this.cdr.markForCheck();
    });

    this.searchDateContorl.valueChanges.pipe(debounceTime(200), takeUntil(this.destroy$)).subscribe((data) => {
      this.searchData = data ?? [];
      this.cdr.markForCheck();
    });
  }

  onFilterTrigger(searchField: string) {
    if (this.searchField !== searchField) {
      this.searchData = '';
    }
    this.searchField = searchField;
  }

  deleteItem(id: number) {
    this.deleteEntity.emit(id);
  }

  onClick(event: Event) {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
