import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  localePath = 'employees.actions.';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.usersList$ = this.userService.getUsers();
  }

  listOfColumns: ColumnItem[] = [
    {
      name: this.localePath + 'first_name',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: UserInfo, b: UserInfo) =>
        a.firstName.localeCompare(b.firstName),
    },
    {
      name: this.localePath + 'last_name',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: UserInfo, b: UserInfo) =>
        a.lastName.localeCompare(b.lastName),
    },
    {
      name: this.localePath + 'email',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: UserInfo, b: UserInfo) => a.email.localeCompare(b.email),
    },
  ];
}
