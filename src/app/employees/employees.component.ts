import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EMPLOYEE_COLUMNS } from '../shared/models/constants/employee-columns';
import { DataTypeEnum } from '../shared/models/emuns/data-type.enum';
import { UserInfo } from '../shared/models/interfaces/user-info';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  usersList$!: Observable<UserInfo[]>;
  EMPLOYEE_COLUMNS = EMPLOYEE_COLUMNS;
  dataTypeEnum = DataTypeEnum;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.usersList$ = this.userService.getUsers();
  }
}
