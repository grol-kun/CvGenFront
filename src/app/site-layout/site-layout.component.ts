import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteLayoutComponent implements OnInit {
  loader$?: Observable<boolean>;

  constructor(private loaderService: LoaderService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loader$ = this.loaderService.loaderStatus$;
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
