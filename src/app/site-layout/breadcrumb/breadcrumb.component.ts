import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MenuItem } from 'src/app/shared/models/interfaces/menu-item';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { ROUTE_DATA_BREADCRUMB } from '../../shared/models/constants/route-data-breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.menuItems = this.getInitialPath();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root.children);
        this.menuItems = this.deleteDuplicate(breadcrumbs);
        this.saveLastPath();
      });
  }

  saveLastPath() {
    this.sessionStorageService.setItem('path', JSON.stringify(this.menuItems));
  }

  getInitialPath() {
    return this.sessionStorageService.getItem('path') ? this.sessionStorageService.getItem('path') : [];
  }

  private createBreadcrumbs(children: ActivatedRoute[], url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    if (!children?.length) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
      if (label != null) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child.children, url, breadcrumbs);
    }

    return [];
  }

  private deleteDuplicate(breadcrumbs: MenuItem[]): MenuItem[] {
    return breadcrumbs.filter((value, index, arr) => index === 0 || value.label !== arr[index - 1].label);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
