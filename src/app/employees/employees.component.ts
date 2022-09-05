import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, takeUntil, Subject } from 'rxjs';
import { EMPLOYEE_COLUMNS } from '../shared/models/constants/employee-columns';
import { ColumnItem } from '../shared/models/interfaces/column-item';
import { UserInfo } from '../shared/models/interfaces/user-info';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent implements OnInit {
  usersList$!: Observable<UserInfo[]>;
  searchField = '';
  searchValue = '';
  searchControl = new FormControl<string>('');
  listOfColumns: ColumnItem[] = EMPLOYEE_COLUMNS;

  private destroy$ = new Subject<void>();

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.usersList$ = this.userService.getUsers();
    this.initSearch();
  }

  initSearch() {
    this.searchControl.valueChanges.pipe(debounceTime(200), takeUntil(this.destroy$)).subscribe((data) => {
      this.searchValue = data ?? '';
      this.cdr.detectChanges();
    });
  }

  onFilterTrigger(searchField: string) {
    if (this.searchField !== searchField) {
      this.searchValue = '';
    }
    this.searchField = searchField;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
