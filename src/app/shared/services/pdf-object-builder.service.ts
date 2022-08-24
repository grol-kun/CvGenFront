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

  private BuildProjectsList(cvObj: CV) {
    return cvObj.attributes.projects.reduce((r: {}[], i) => {
      r = [
        ...r,
        {
          stack: [
            { text: i.attributes.name, style: 'listItemHeader' },
            {
              text: `${i.attributes.from} ${i.attributes.to && `- ${i.attributes.to}`}`,
              style: 'listItemSubHeader',
            },
            { text: i.attributes.description, style: 'listItemDesc' },
          ],
          style: 'listItem',
        },
      ];
      return r;
    }, []);
  }

  private BuildEducationList(userObj: UserInfo) {
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

  private BuildSkillList(cvObj: CV) {
    return cvObj.attributes.skills.reduce((r: {}[], i) => {
      r = [
        ...r,
        {
          stack: [{ text: i.attributes.name }, { text: i.attributes.level, fontSize: 7 }],
          style: 'listItem',
        },
      ];
      return r;
    }, []);
  }

  private BuildLanguagesList(cvObj: CV) {
    return cvObj.attributes.languages.reduce((r: {}[], i) => {
      r = [
        ...r,
        {
          stack: [{ text: i.attributes.name }, { text: i.attributes.level, fontSize: 7 }],
          style: 'listItem',
        },
      ];
      return r;
    }, []);
  }

  private BuildLogo() {
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

  private BuildHeader(userObj: UserInfo) {
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

  private BuildLogoSection() {
    return [{ stack: this.BuildLogo(), style: 'headerLinks' }];
  }

  private BuildSkillsSection(cvObj: CV) {
    return [
      { text: 'Skills', style: 'sectionTitle' },
      { stack: this.BuildSkillList(cvObj), style: 'list' },
    ];
  }

  private BuildLanguagesSection(cvObj: CV) {
    return [
      { text: 'Languages', style: 'sectionTitle' },
      { stack: this.BuildLanguagesList(cvObj), style: 'list' },
    ];
  }
  private BuildEducationSection(userObj: UserInfo) {
    return [
      { text: 'Education', style: 'sectionTitle' },
      { stack: this.BuildEducationList(userObj), style: 'list' },
    ];
  }
  private BuildProjectsSection(cvObj: CV) {
    return [
      { text: 'Projects', style: 'sectionTitle' },
      { stack: this.BuildProjectsList(cvObj), style: 'list' },
    ];
  }

  private BuildHeaderSide() {
    return [this.BuildLogoSection()];
  }

  private BuildMain(userObj: UserInfo, cvObj: CV) {
    return [this.BuildEducationSection(userObj), this.BuildProjectsSection(cvObj)];
  }

  private BuildSide(cvObj: CV) {
    return [this.BuildSkillsSection(cvObj), this.BuildLanguagesSection(cvObj)];
  }

  public BuildDocDefinition(cvObj: CV, userObj: UserInfo) {
    return {
      pageSize: 'A4',
      background: () => {
        return {
          canvas: [CANVAS],
        };
      },
      content: [
        {
          columns: [
            {
              width: '25%',
              stack: this.BuildHeaderSide(),
              style: 'headerSide',
            },
            {
              width: '75%',
              stack: this.BuildHeader(userObj),
              style: 'headerMain',
            },
          ],
          columnGap: 56,
        },
        {
          columns: [
            {
              width: '25%',
              stack: this.BuildSide(cvObj),
              style: 'side',
            },
            {
              width: '75%',
              stack: this.BuildMain(userObj, cvObj),
            },
          ],
          columnGap: 56,
        },
      ],
      styles: STYLES,
    };
  }
}
