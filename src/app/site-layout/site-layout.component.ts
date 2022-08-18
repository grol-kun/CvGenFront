import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
})
export class SiteLayoutComponent implements OnInit {
  loaderObserver$?: BehaviorSubject<boolean>;

  constructor(public loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderObserver$ = this.loaderService.loaderStatus;
  }
}
