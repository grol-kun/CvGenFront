import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuItem } from 'src/app/shared/models/interfaces/menu-item';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  menuItems: MenuItem[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      this.menuItems = this.deleteDuplicate(breadcrumbs);
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;
    let result;
    let previusLabel = '';

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      if (label !== undefined && label !== null && label !== previusLabel) {
        breadcrumbs.push({ label, url });
        previusLabel = label;
      }

      result = this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return result as MenuItem[];
  }

  deleteDuplicate(breadcrumbs: MenuItem[]): MenuItem[] {
    let result: MenuItem[] = [];
    let previusLabel = '';

    breadcrumbs.forEach((item) => {
      if (item.label !== previusLabel) {
        result.push(item);
        previusLabel = item.label;
      }
    });

    console.log('result: ', result);
    return result;
  }
}
