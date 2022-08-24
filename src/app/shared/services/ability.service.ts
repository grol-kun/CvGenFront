import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbilityService {
  constructor(private httpClient: HttpClient) {}

  getFullList<T>(type: string): Observable<T> {
    return this.httpClient.get<T>(`/api/${type}`);
  }

  getItemById<T>(type: string, id: string): Observable<T> {
    return this.httpClient.get<T>(`/api/${type}/${id}`);
  }
}
