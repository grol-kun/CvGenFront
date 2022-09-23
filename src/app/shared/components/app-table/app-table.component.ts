import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { DataTypeEnum } from '../../models/emuns/data-type.enum';
import { SearchTypeEnum } from '../../models/emuns/search-type.enum';
import { ColumnItem } from '../../models/interfaces/column-item';
import { Entity } from '../../models/types/entity';

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTableComponent implements OnInit {
  @Input() listOfColumns: ColumnItem[] = [];
  @Input() data: Entity[] | null = null;

  @ContentChild('nz_icon', { static: false }) iconTemplateRef: TemplateRef<any> | undefined;

  @Output() redirection = new EventEmitter<Entity>();

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

  redirect(data: Entity) {
    this.redirection.emit(data);
  }

  onFilterTrigger(searchField: string) {
    if (this.searchField !== searchField) {
      this.searchData = '';
    }
    this.searchField = searchField;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
