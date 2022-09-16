import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CANVAS } from '../models/constants/canvas';
import { PDF_COLORS } from '../models/constants/pdf-colors';
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
    return i < counter ? { ...TABLE_ITEM_FILLED } : { ...TABLE_ITEM_EMPTY };
  }

  private buildLevelTable(k: string) {
    return {
      table: {
        body: [[...new Array(5)].map((e, i) => (e = this.buildLevelCell(i, +k)))],
      },
      margin: [-4, 0, 0, 0],
      layout: {
        hLineWidth: () => 4,
        vLineWidth: () => 4,
        hLineColor: () => PDF_COLORS.WHITE,
        vLineColor: () => PDF_COLORS.WHITE,
      },
    };
  }

  private buildDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', { dateStyle: 'long' });
  }

  private buildProjectsList(cvObj: Cv) {
    const projects = cvObj.attributes.projects.data;

    return projects
      ? projects.reduce(
          (a: object[], c) => [
            ...a,
            {
              stack: [
                { text: c.attributes.name, style: 'listItemHeader' },
                {
                  text: `${this.buildDate(c.attributes.from)} ${
                    this.buildDate(c.attributes.to) && `- ${this.buildDate(c.attributes.to)}`
                  }`,
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
        )
      : [];
  }

  private buildDescriptionList(cvObj: Cv) {
    return [
      {
        stack: [
          {
            text: `${cvObj.attributes.user.description}`,
            style: 'listItemSubHeader',
          },
        ],
        style: 'listItem',
      },
    ];
  }

  private buildEducationList(cvObj: Cv) {
    return [
      {
        stack: [
          {
            text: `${cvObj.attributes.user.education}`,
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
          stack: [{ text: c.attributes.name }, this.buildLevelTable(c.attributes.level!)],
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

  private buildHeader(cvObj: Cv, userObj: UserInfo) {
    return [
      {
        width: '*',
        stack: [
          {
            text: `${cvObj.attributes.user.firstName} ${cvObj.attributes.user.lastName}`,
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
  private buildDescriptionSection(cvObj: Cv) {
    return [
      { text: 'Profile', style: 'sectionTitle' },
      { stack: this.buildDescriptionList(cvObj), style: 'list' },
    ];
  }
  private buildEducationSection(cvObj: Cv) {
    return [
      { text: 'Education', style: 'sectionTitle' },
      { stack: this.buildEducationList(cvObj), style: 'list' },
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

  private buildMain(cvObj: Cv) {
    return [this.buildDescriptionSection(cvObj), this.buildEducationSection(cvObj), this.buildProjectsSection(cvObj)];
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
              stack: this.buildHeader(cvObj, userObj),
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
              stack: this.buildMain(cvObj),
            },
          ],
          columnGap: 56,
        },
      ],
      styles: STYLES,
    };
  }
}
