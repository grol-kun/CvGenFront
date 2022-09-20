import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EMPLOYEE_COLUMNS } from '../shared/models/constants/employee-columns';
import { DataTypeEnum } from '../shared/models/emuns/data-type.enum';
import { UserInfo } from '../shared/models/interfaces/user-info';
import { Entity } from '../shared/models/types/entity';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent implements OnInit {
  usersList$!: Observable<UserInfo[]>;
  EMPLOYEE_COLUMNS = EMPLOYEE_COLUMNS;
  dataTypeEnum = DataTypeEnum;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.usersList$ = this.userService.getUsers();
  }

  redirect(data: Entity) {
    this.router.navigate([`/${this.dataTypeEnum.employees}/`, data.id]);
  }
}
