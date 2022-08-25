import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CANVAS } from '../models/constants/canvas';
import { STYLES } from '../models/constants/styles';
import { CV } from '../models/interfaces/cv';
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

  private buildProjectsList(cvObj: CV) {
    return cvObj.attributes.projects.reduce(
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
          { text: 'Higher Education', style: 'listItemHeader' },
          {
            text: `${userObj.education}`,
            style: 'listItemSubHeader',
          },
        ],
        style: 'listItem',
      },
    ];
  }

  private buildSkillList(cvObj: CV) {
    return cvObj.attributes.skills.reduce(
      (a: object[], c) => [
        ...a,
        {
          stack: [{ text: c.attributes.name }, { text: c.attributes.level, fontSize: 7 }],
          style: 'listItem',
        },
      ],
      []
    );
  }

  private buildLanguagesList(cvObj: CV) {
    return cvObj.attributes.languages.reduce(
      (a: object[], c) => [
        ...a,
        {
          stack: [{ text: c.attributes.name }, { text: c.attributes.level, fontSize: 7 }],
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
          { text: 'Front-end Developer', style: 'title' },
          { text: userObj.email, style: 'headerListItem' },
        ],
      },
    ];
  }

  private buildLogoSection() {
    return [{ stack: this.buildLogo(), style: 'headerLinks' }];
  }

  private buildSkillsSection(cvObj: CV) {
    return [
      { text: 'Skills', style: 'sectionTitle' },
      { stack: this.buildSkillList(cvObj), style: 'list' },
    ];
  }

  private buildLanguagesSection(cvObj: CV) {
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
  private buildProjectsSection(cvObj: CV) {
    return [
      { text: 'Projects', style: 'sectionTitle' },
      { stack: this.buildProjectsList(cvObj), style: 'list' },
    ];
  }

  private buildHeaderSide() {
    return [this.buildLogoSection()];
  }

  private buildMain(userObj: UserInfo, cvObj: CV) {
    return [this.buildEducationSection(userObj), this.buildProjectsSection(cvObj)];
  }

  private buildSide(cvObj: CV) {
    return [this.buildSkillsSection(cvObj), this.buildLanguagesSection(cvObj)];
  }

  public buildDocDefinition(cvObj: CV, userObj: UserInfo) {
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
