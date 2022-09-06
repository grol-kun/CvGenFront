import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CANVAS } from '../models/constants/canvas';
import { STYLES } from '../models/constants/styles';
import { Cv } from '../models/interfaces/cv';
import { UserInfo } from '../models/interfaces/user-info';

@Injectable({
  providedIn: 'root',
})
export class PdfObjectBuilderService {
  logoSvg?: string;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get(`./assets/svgs/logo.svg`, { responseType: 'text' }).subscribe((value) => {
      this.logoSvg = value.toString();
    });
  }

  private levelFilledCounter(i: string) {
    return new Array(Number(i));
  }
  private levelEmptyCounter(i: string) {
    return new Array(5 - Number(i));
  }

  private buildProjectsList(cvObj: Cv) {
    return cvObj.attributes.projects?.data.reduce(
      (a: object[], c) => [
        ...a,
        {
          stack: [
            { text: c.attributes.name, style: 'listItemHeader' },
            {
              text: `${c.attributes.from} ${c.attributes.to && `- ${c.attributes.to}`}`,
              style: 'listItemSubHeader',
            },
            { text: c.attributes.description, style: 'listItemDesc' },
            { text: 'Responsibilities', fontSize: 8 },
            c.attributes.responsibilities.data.reduce(
              (a: object[], c) => [
                ...a,
                {
                  stack: [{ text: c.attributes.name }],
                  style: 'listItem',
                },
              ],
              []
            ),
          ],
          style: 'listItem',
        },
      ],
      []
    );
  }

  private buildEducationList(userObj: UserInfo) {
    return [
      {
        stack: [
          {
            text: `${userObj.education}`,
            style: 'listItemSubHeader',
          },
        ],
        style: 'listItem',
      },
    ];
  }

  private buildSkillList(cvObj: Cv) {
    return cvObj.attributes.skills.reduce(
      (a: object[], c) => [
        ...a,
        {
          stack: [
            { text: c.attributes.name },
            {
              table: {
                body: [
                  [
                    this.levelFilledCounter(c.attributes.level!).reduce(
                      (a: []) => [
                        ...a,
                        {
                          text: '1',
                          style: 'tableItemFilled',
                          fontSize: 9,
                        },
                      ],
                      []
                    ),
                    this.levelEmptyCounter(c.attributes.level!).reduce(
                      (a: []) => [
                        ...a,
                        {
                          text: '0',
                          style: 'tableItemEmpty',
                        },
                      ],
                      []
                    ),
                  ],
                ],
              },
              layout: 'noBorders',
            },
          ],
          style: 'listItem',
        },
      ],
      []
    );
  }

  private buildLanguagesList(cvObj: Cv) {
    return cvObj.attributes.languages.reduce(
      (a: object[], c) => [
        ...a,
        {
          stack: [
            { text: c.attributes.name },
            {
              table: {
                body: [
                  [
                    this.levelFilledCounter(c.attributes.level!).reduce(
                      (a: []) => [
                        ...a,
                        {
                          text: '1',
                          style: 'tableItemFilled',
                        },
                      ],
                      []
                    ),
                    this.levelEmptyCounter(c.attributes.level!).reduce(
                      (a: []) => [
                        ...a,
                        {
                          text: '0',
                          style: 'tableItemEmpty',
                        },
                      ],
                      []
                    ),
                  ],
                ],
              },
              layout: 'noBorders',
            },
          ],
          style: 'listItem',
        },
      ],
      []
    );
  }

  private buildLogo() {
    return this.logoSvg
      ? [
          {
            width: 120,
            svg: this.logoSvg,
            fit: [120, 120],
          },
        ]
      : [];
  }

  private buildHeader(userObj: UserInfo) {
    return [
      {
        width: '*',
        stack: [
          {
            text: `${userObj.firstName} ${userObj.lastName}`,
            style: 'name',
          },
          { text: '', style: 'title' },
          { text: userObj.email, style: 'headerListItem' },
        ],
      },
    ];
  }

  private buildLogoSection() {
    return [{ stack: this.buildLogo(), style: 'headerLinks' }];
  }

  private buildSkillsSection(cvObj: Cv) {
    return [
      { text: 'Skills', style: 'sectionTitle' },
      { stack: this.buildSkillList(cvObj), style: 'list' },
    ];
  }

  private buildLanguagesSection(cvObj: Cv) {
    return [
      { text: 'Languages', style: 'sectionTitle' },
      { stack: this.buildLanguagesList(cvObj), style: 'list' },
    ];
  }
  private buildEducationSection(userObj: UserInfo) {
    return [
      { text: 'Education', style: 'sectionTitle' },
      { stack: this.buildEducationList(userObj), style: 'list' },
    ];
  }
  private buildProjectsSection(cvObj: Cv) {
    return [
      { text: 'Projects', style: 'sectionTitle' },
      { stack: this.buildProjectsList(cvObj), style: 'list' },
    ];
  }

  private buildHeaderSide() {
    return [this.buildLogoSection()];
  }

  private buildMain(userObj: UserInfo, cvObj: Cv) {
    return [this.buildEducationSection(userObj), this.buildProjectsSection(cvObj)];
  }

  private buildSide(cvObj: Cv) {
    return [this.buildSkillsSection(cvObj), this.buildLanguagesSection(cvObj)];
  }

  public buildDocDefinition(cvObj: Cv, userObj: UserInfo) {
    return {
      pageSize: 'A4',
      background: () => ({
        canvas: [CANVAS],
      }),
      content: [
        {
          columns: [
            {
              width: '25%',
              stack: this.buildHeaderSide(),
              style: 'headerSide',
            },
            {
              width: '75%',
              stack: this.buildHeader(userObj),
              style: 'headerMain',
            },
          ],
          columnGap: 56,
        },
        {
          columns: [
            {
              width: '25%',
              stack: this.buildSide(cvObj),
              style: 'side',
            },
            {
              width: '75%',
              stack: this.buildMain(userObj, cvObj),
            },
          ],
          columnGap: 56,
        },
      ],
      styles: STYLES,
    };
  }
}
