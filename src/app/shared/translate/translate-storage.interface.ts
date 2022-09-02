import { TranslateMode } from './translate.model';

export interface TranslateStorage {
  set(translateMode: TranslateMode): void;
  get(): TranslateMode;
}
