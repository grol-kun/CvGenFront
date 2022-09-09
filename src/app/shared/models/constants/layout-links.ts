import { LayoutLink } from '../interfaces/layout-link';

export const LAYOUT_LINKS: LayoutLink[] = [
  {
    name: 'employees',
    localeData: 'layout.employees',
    routerLink: ['/employees/'],
    nzTypeName: 'user',
  },
  {
    name: 'projects',
    localeData: 'layout.projects',
    routerLink: ['/projects/'],
    nzTypeName: 'database',
  },
  {
    name: 'cvs',
    localeData: 'layout.cvs',
    routerLink: ['/cvs/'],
    nzTypeName: 'folder',
  },
  {
    name: 'entities',
    localeData: 'layout.entities',
    routerLink: ['/entities/'],
    nzTypeName: 'file',
  },
];
