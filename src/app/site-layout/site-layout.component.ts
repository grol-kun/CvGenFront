import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { infoSelector } from '../core/store/selectors/auth.selector';
import { LAYOUT_LINKS } from '../shared/models/constants/layout-links';
import { LayoutLink } from '../shared/models/interfaces/layout-link';
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
  currentPath!: string;
  layoutLinks: LayoutLink[] = LAYOUT_LINKS;

  constructor(
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef,
    private store: Store,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.parseUrl(event.url).root.children['primary']) {
          this.currentPath = this.router
            .parseUrl(event.url)
            .root.children['primary']?.segments.map((it) => it.path)
            .slice(0, 1)
            .join();
        } else {
          this.currentPath = LAYOUT_LINKS[0].name;
        }
      }
    });
  }

  ngOnInit(): void {
    this.loader$ = this.loaderService.loaderStatus$;
    this.info$ = this.store.select(infoSelector);
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
