import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../shared/services/loader.service';
import { PdfService } from '../shared/services/pdf.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteLayoutComponent implements OnInit {
  loader$?: Observable<boolean>;

  constructor(private loaderService: LoaderService, private cd: ChangeDetectorRef, private pdf: PdfService) {}

  ngOnInit(): void {
    this.loader$ = this.loaderService.loaderStatus$;
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  exportPdf() {
    const cv = {
      id: 1,
      attributes: {
        name: 'angular 2 CV',
        description:
          'Middle web-developer with experience in several IT-areas. Diversified personality. Communicative and friendly. Loves mom and dad. There is a cat named Barsik.\nHe has deep knowledge in various technologies such as: HTML, CSS, JS. Deep knowledge of computer science.',
        projects: [
          {
            id: 1,
            attributes: {
              name: 'project_01',
              description: 'This is description of the project_01',
              domain: 'project_01.com',
              from: '2022-05-18',
              to: '2022-08-18',
              internalName: 'easy_project_01',
              createdAt: '2022-08-16T07:15:42.615Z',
              updatedAt: '2022-08-16T07:35:41.548Z',
              publishedAt: '2022-08-16T07:29:25.575Z',
            },
          },
          {
            id: 2,
            attributes: {
              name: 'Investment platform',
              description:
                'The investment platform allows to control and create a business process for clients and for owners of the platform. Allows you to ensure a continuous process of making a profit for the company, regardless of any external pressure factors. Dumping other companies with regular complaints and implicit hacking.',
              domain: 'Fintech',
              from: '2020-12-01',
              to: '2022-08-31',
              internalName: 'VIDRIO',
              createdAt: '2022-08-16T07:33:53.648Z',
              updatedAt: '2022-08-16T07:43:48.548Z',
              publishedAt: '2022-08-16T07:33:54.695Z',
            },
          },
        ],
        languages: [
          {
            id: 1,
            attributes: {
              name: 'English',
              createdAt: '2022-08-15T10:42:00.768Z',
              updatedAt: '2022-08-15T12:04:51.377Z',
              publishedAt: '2022-08-15T12:04:51.376Z',
              level: null,
            },
          },
          {
            id: 5,
            attributes: {
              name: 'Русский',
              createdAt: '2022-08-16T07:27:19.449Z',
              updatedAt: '2022-08-16T07:27:20.294Z',
              publishedAt: '2022-08-16T07:27:20.293Z',
              level: null,
            },
          },
        ],
        skills: [
          {
            id: 1,
            attributes: {
              name: 'angular',
              createdAt: '2022-08-16T07:21:08.663Z',
              updatedAt: '2022-08-16T07:21:16.703Z',
              publishedAt: '2022-08-16T07:21:16.702Z',
              level: null,
            },
          },
          {
            id: 5,
            attributes: {
              name: 'RxJs',
              createdAt: '2022-08-16T07:25:56.446Z',
              updatedAt: '2022-08-16T07:25:57.150Z',
              publishedAt: '2022-08-16T07:25:57.149Z',
              level: null,
            },
          },
          {
            id: 6,
            attributes: {
              name: 'Meterial',
              createdAt: '2022-08-16T07:26:20.455Z',
              updatedAt: '2022-08-16T07:26:20.978Z',
              publishedAt: '2022-08-16T07:26:20.977Z',
              level: null,
            },
          },
        ],
        createdAt: '2022-08-16T07:48:12.564Z',
        updatedAt: '2022-08-23T09:23:35.172Z',
        publishedAt: '2022-08-16T07:48:32.933Z',
      },
    };
    const user = {
      id: 1,
      username: 'genadi_zhelyazkov',
      email: 'neverniu@aol.com',
      provider: 'local',
      confirmed: true,
      blocked: false,
      createdAt: '2022-08-09T13:01:48.895Z',
      updatedAt: '2022-08-24T09:38:27.494Z',
      skills: [
        {
          id: 1,
          attributes: {
            name: 'Angular',
            createdAt: '2022-08-16T07:21:08.663Z',
            updatedAt: '2022-08-23T11:29:06.087Z',
            publishedAt: '2022-08-16T07:21:16.702Z',
            level: '5',
          },
        },
        {
          id: 5,
          attributes: {
            name: 'RxJs',
            createdAt: '2022-08-16T07:25:56.446Z',
            updatedAt: '2022-08-16T07:25:57.150Z',
            publishedAt: '2022-08-16T07:25:57.149Z',
            level: '4',
          },
        },
      ],
      languages: [
        {
          id: 1,
          attributes: {
            name: 'English',
            createdAt: '2022-08-15T10:42:00.768Z',
            updatedAt: '2022-08-15T12:04:51.377Z',
            publishedAt: '2022-08-15T12:04:51.376Z',
            level: '4',
          },
        },
      ],
      education: 'ВГУ',
      description: 'Its description',
      firstName: 'Гена',
      lastName: 'Желязков',
      cvs: []
    };
    this.pdf.generatePdf(cv, user);
  }
}
