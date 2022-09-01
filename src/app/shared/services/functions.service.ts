import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor() {}

  getEnumKeyByValue<T extends { [index: string]: string }>(Enum: T, Value: string): keyof T {
    let key = Object.keys(Enum).filter((x) => Enum[x] == Value);
    return key[0];
  }
}
