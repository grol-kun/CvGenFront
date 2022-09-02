import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  getEnumKeyByValue<T extends { [index: string]: string }>(Enum: T, Value: string): keyof T | undefined {
    return Object.keys(Enum).find((x) => Enum[x] == Value);
  }
}
