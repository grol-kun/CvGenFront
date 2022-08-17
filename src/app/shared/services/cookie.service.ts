import { Injectable } from '@angular/core';
import { DEFAULT_MAX_AGE } from '../models/constants/constants';
import { CookieOptions } from '../models/interfaces/cookieOptions';

@Injectable()
export class CookieService {
  constructor() { }


  getCookie(name: string): string {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : '';
  }

  setCookie(name: string, value: string, options: CookieOptions = { secure: true, 'max-age': DEFAULT_MAX_AGE }) {

    options = {
      path: '/',
      ...options
    };

    if (options['expires'] instanceof Date) {
      options['expires'] = options['expires'].toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  deleteCookie(cookieName: string) {
    this.setCookie(cookieName, "", { 'max-age': -1 })
  }
}
