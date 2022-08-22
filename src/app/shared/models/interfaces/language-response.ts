import { Language } from './language';
import { Pagination } from './pagination';

export interface LanguageResponse {
  data: Language[];
  meta: {
    pagination: Pagination;
  };
}
