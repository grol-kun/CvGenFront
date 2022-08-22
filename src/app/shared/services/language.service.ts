import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageResponse } from '../models/interfaces/language-response';
import { LanguageResponseById } from '../models/interfaces/language-response-by-id';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private httpClient: HttpClient) {}

  getFullList(): Observable<LanguageResponse> {
    return this.httpClient.get<LanguageResponse>('/api/languages');
  }

  getItemById(id: string): Observable<LanguageResponseById> {
    return this.httpClient.get<LanguageResponseById>(`/api/languages/${id}`);
  }
}
