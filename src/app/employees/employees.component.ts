import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, filter, map, debounceTime, takeUntil, Subject } from 'rxjs';
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
  searchValue = '';
  visible = false;
  searchControl = new FormControl<string>('');
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

  listOfColumns: ColumnItem[] = EMPLOYEE_COLUMNS;

  reset(): void {
    this.searchValue = '';
    this.close();
  }

  close() {
    this.visible = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
