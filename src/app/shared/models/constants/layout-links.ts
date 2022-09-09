import { LayoutLink } from '../interfaces/layout-link';

export const LAYOUT_LINKS: LayoutLink[] = [
  {
    localeData: 'layout.employees',
    routerLink: ['/employees/'],
    nzTypeName: 'user',
  },
  {
    localeData: 'layout.projects',
    routerLink: ['/projects/'],
    nzTypeName: 'database',
  },
  {
    localeData: 'layout.cvs',
    routerLink: ['/cvs/'],
    nzTypeName: 'folder',
  },
  {
    localeData: 'layout.entities',
    routerLink: ['/entities/'],
    nzTypeName: 'file',
  },
];
