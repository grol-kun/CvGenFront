import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EMPLOYEE_COLUMNS } from '../shared/models/constants/employee-columns';
import { ColumnItem } from '../shared/models/interfaces/column-item';
import { UserInfo } from '../shared/models/interfaces/user-info';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  usersList$!: Observable<UserInfo[]>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.usersList$ = this.userService.getUsers();
  }

  listOfColumns: ColumnItem[] = EMPLOYEE_COLUMNS;
}
