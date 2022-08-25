import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpireDateService {
  constructor() {}

  getExpireDate(): Date {
    const date = new Date();
    return new Date(date.setFullYear(date.getFullYear() + 1));
  }
}
