import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { UserInfo } from 'src/app/shared/models/interfaces/user-info';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  userId?: string;
  user$?: Observable<UserInfo>;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.user$ = this.route.params.pipe(
      tap(({ id }) => (this.userId = id)),
      switchMap(({ id }) => this.userService.getUserById(id))
    );
  }
}
