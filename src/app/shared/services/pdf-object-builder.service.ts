import { Injectable } from '@angular/core';
import { CV } from '../models/interfaces/cv';
import { UserInfo } from '../models/interfaces/user-info'; 

@Injectable({
  providedIn: 'root',
})
export class PdfObjectBuilderService {
  logoSvg: string;

  constructor() {
    this.logoSvg =
      '<svg width="213" height="38" viewBox="0 0 213 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.322861 7.60449H6.81898V29.1895H0.322861V7.60449Z" fill="#191B1D"/><path d="M35.7489 16.8053V29.1507H29.2528V17.7371C29.2528 14.2431 27.5581 12.6126 24.6934 12.6126C21.5866 12.6126 19.327 14.476 19.327 18.397V29.0731H12.8713V7.48807H19.0446V10.0115C20.7796 8.14804 23.4426 7.13867 26.4687 7.13867C31.7947 7.25514 35.7489 10.2444 35.7489 16.8053Z" fill="#191B1D"/><path d="M64.7998 16.8053V29.1507H58.3037V17.7371C58.3037 14.2431 56.609 12.6126 53.7443 12.6126C50.5971 12.6126 48.3779 14.476 48.3779 18.397V29.0731H41.8818V7.48807H48.0551V10.0115C49.7901 8.14804 52.4531 7.13867 55.4793 7.13867C60.8053 7.25514 64.7998 10.2444 64.7998 16.8053Z" fill="#191B1D"/><path d="M70.7309 18.3968C70.7309 11.8747 75.9359 7.25488 83.0372 7.25488C90.1789 7.25488 95.3032 11.8747 95.3032 18.3968C95.3032 24.9189 90.1789 29.5387 83.0372 29.5387C75.9762 29.4999 70.7309 24.88 70.7309 18.3968ZM88.7667 18.3968C88.7667 14.6699 86.3055 12.457 83.0372 12.457C79.769 12.457 77.3077 14.7087 77.3077 18.3968C77.3077 22.0849 79.8093 24.3365 83.0372 24.3365C86.3458 24.3365 88.7667 22.0849 88.7667 18.3968Z" fill="#191B1D"/><path d="M137.427 7.60449L129.317 29.1895H123.063L118.06 15.8347L112.855 29.1895H106.601L98.531 7.60449H104.664L109.99 22.2015L115.477 7.60449H120.965L126.291 22.2015L131.738 7.60449H137.427Z" fill="#191B1D"/><path d="M142.39 7.60449H148.886V29.1895H142.39V7.60449Z" fill="#191B1D"/><path d="M154.212 27.1317L156.391 22.6284C158.368 23.8707 161.394 24.7248 164.138 24.7248C167.124 24.7248 168.294 23.9483 168.294 22.7448C168.294 19.212 154.737 22.7837 154.737 14.204C154.737 10.0889 158.61 7.25488 165.147 7.25488C168.253 7.25488 171.643 7.91486 173.781 9.15716L171.602 13.5829C169.383 12.4182 167.164 11.9523 165.106 11.9523C162.201 11.9523 160.95 12.8452 160.95 13.9711C160.95 17.698 174.507 14.0875 174.507 22.5507C174.507 26.5494 170.634 29.4222 163.936 29.4222C160.184 29.4999 156.351 28.4905 154.212 27.1317Z" fill="#191B1D"/><path d="M202.267 20.1052H185.321C185.966 22.7839 188.307 24.4144 191.736 24.4144C194.117 24.4144 195.812 23.7545 197.345 22.3181L200.774 25.9285C198.676 28.219 195.569 29.4225 191.535 29.4225C183.788 29.4225 178.744 24.7638 178.744 18.2806C178.744 11.8361 183.868 7.13867 190.728 7.13867C197.345 7.13867 202.388 11.4091 202.388 18.3194C202.388 18.9405 202.267 19.6005 202.267 20.1052ZM185.24 16.4559H196.255C195.771 13.6996 193.673 11.9526 190.768 11.9526C187.782 12.0302 185.684 13.6996 185.24 16.4559Z" fill="#191B1D"/><path d="M209.006 7.52678C211.033 7.52678 212.677 5.94509 212.677 3.99398C212.677 2.04287 211.033 0.461182 209.006 0.461182C206.978 0.461182 205.334 2.04287 205.334 3.99398C205.334 5.94509 206.978 7.52678 209.006 7.52678Z" fill="#C63031"/></svg>';
  }

  private BuildProjectsList(cvObj: CV) {
    return [...cvObj.attributes.projects].reduce((r: {}[], i) => {
      r.push({
        stack: [
          { text: i.attributes.name, style: 'listItemHeader' },
          {
            text: `${i.attributes.from} ${i.attributes.to && `- ${i.attributes.to}`}`,
            style: 'listItemSubHeader',
          },
          { text: i.attributes.description, style: 'listItemDesc' },
        ],
        style: 'listItem',
      });
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
    return [...cvObj.attributes.skills].reduce((r: {}[], i) => {
      r.push({
        stack: [{ text: i.attributes.name }, { text: i.attributes.level, fontSize: 7 }],
        style: 'listItem',
      });
      return r;
    }, []);
  }

  private BuildLanguagesList(cvObj: CV) {
    return [...cvObj.attributes.languages].reduce((r: {}[], i) => {
      r.push({
        stack: [{ text: i.attributes.name }, { text: i.attributes.level, fontSize: 7 }],
        style: 'listItem',
      });
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
      background: function () {
        return {
          canvas: [
            {
              type: 'rect',
              x: 200,
              y: 0,
              w: 600,
              h: 110.89,
              color: '#C63031',
            },
          ],
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
      styles: {
        subheader: {
          fontSize: 15,
          bold: true,
        },
        list: {
          margin: [0, 0, 0, 16],
          fontSize: 10,
        },
        headerMain: {
          margin: [0, 0, 0, 24],
          color: '#1F2937',
        },
        headerSide: {
          fontSize: 10,
          color: 'white',
          margin: [0, 0, 0, 24],
        },
        section: {
          margin: [0, 0, 0, 24],
        },
        sectionTitle: {
          fontSize: 16,
          lineHeight: 1.1,
          bold: true,
          margin: [0, 0, 0, 16],
        },
        main: {
          color: '#1F2937',
        },
        side: {},
        name: {
          color: 'white',
          fontSize: 18,
          margin: [0, 0, 0, 4],
          bold: true,
        },
        title: {
          color: 'white',
          fontSize: 14,
          margin: [0, 0, 0, 4],
          bold: true,
        },
        summary: {
          fontSize: 10,
          lineHeight: 1.1,
        },
        headerLinks: {
          margin: [0, 0, 0, 6],
        },
        listItem: {
          fontSize: 9,
          margin: [0, 0, 0, 8],
        },
        listItemHeader: {
          color: '#C63031',
          fontSize: 10,
          bold: true,
          margin: [0, 0, 0, 3],
        },
        listItemSubHeader: {
          fontSize: 8,
          margin: [0, 0, 0, 3],
        },
        listItemDesc: {
          lineHeight: 1.1,
          fontSize: 9,
        },
        headerListLinks: {
          decoration: 'underline',
          margin: [0, 0, 0, 3],
          lineHeight: 1.2,
        },
        headerListItem: {
          color: 'white',
          lineHeight: 1.2,
          margin: [0, 0, 0, 3],
        },
      },
    };
  }
}
