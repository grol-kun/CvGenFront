import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CANVAS } from '../models/constants/canvas';
import { STYLES } from '../models/constants/styles';
import { TABLE_ITEM_EMPTY } from '../models/constants/table-item-empty';
import { TABLE_ITEM_FILLED } from '../models/constants/table-item-filled';
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

  private buildLevelCell(i: number, counter: number) {
    return i < counter ? TABLE_ITEM_FILLED : TABLE_ITEM_EMPTY;
  }

  private buildLevelTable(k: string) {
    return {
      table: {
        body: [[...new Array(5)].map((e, i) => (e = this.buildLevelCell(i, +k)))],
      },
      layout: 'noBorders',
      margin: [8, 0, 0, 0],
    };
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

  private buildSkillList(userObj: UserInfo) {
    return userObj.skills.reduce(
      (a: object[], c) => [
        ...a,
        {
          stack: [{ text: c.attributes.name }, this.buildLevelTable(c.attributes.level!)],
          style: 'listItem',
        },
      ],
      []
    );
  }

  private buildLanguagesList(userObj: UserInfo) {
    return userObj.languages.reduce(
      (a: object[], c) => [
        ...a,
        {
          stack: [{ text: c.attributes.name }, this.buildLevelTable(c.attributes.level!)],
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

  private buildSkillsSection(userObj: UserInfo) {
    return [
      { text: 'Skills', style: 'sectionTitle' },
      { stack: this.buildSkillList(userObj), style: 'list' },
    ];
  }

  private buildLanguagesSection(userObj: UserInfo) {
    return [
      { text: 'Languages', style: 'sectionTitle' },
      { stack: this.buildLanguagesList(userObj), style: 'list' },
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

  private buildSide(userObj: UserInfo) {
    return [this.buildSkillsSection(userObj), this.buildLanguagesSection(userObj)];
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
              stack: this.buildSide(userObj),
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
