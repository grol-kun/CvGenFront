import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/shared/models/interfaces/user-info';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() user$?: Observable<UserInfo>;

  constructor() {}

  ngOnInit(): void {}
}
