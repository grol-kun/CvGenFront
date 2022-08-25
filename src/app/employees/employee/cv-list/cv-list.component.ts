import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/shared/models/interfaces/user-info';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss'],
})
export class CvListComponent implements OnInit {
  @Input() user!: UserInfo | null;

  constructor() {}

  ngOnInit(): void {}
}
