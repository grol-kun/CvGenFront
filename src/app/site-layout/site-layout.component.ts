import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { infoSelector } from '../core/store/selectors/auth.selector';
import { MyInfo } from '../shared/models/interfaces/my-info';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteLayoutComponent implements OnInit {
  loader$?: Observable<boolean>;
  info$!: Observable<MyInfo | null>;

  constructor(private loaderService: LoaderService, private cd: ChangeDetectorRef, private store: Store) {}

  ngOnInit(): void {
    this.loader$ = this.loaderService.loaderStatus$;
    this.info$ = this.store.select(infoSelector);
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
