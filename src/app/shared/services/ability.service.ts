import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseOneEntity } from '../models/interfaces/response-one-entity';

@Injectable({
  providedIn: 'root',
})
export class AbilityService {
  constructor(private httpClient: HttpClient) {}

  getFullList<T>(type: string): Observable<T> {
    return this.httpClient.get<T>(`/api/${type}`);
  }

  getItemById<T>(type: string, id: number): Observable<T> {
    return this.httpClient.get<T>(`/api/${type}/${id}`);
  }

  addItem<T>(type: string, body: ResponseOneEntity<T>) {
    return this.httpClient.post(`/api/${type}`, body);
  }

  deleteItemById<T>(type: string, id: number): Observable<T> {
    return this.httpClient.delete<T>(`/api/${type}/${id}`);
  }
}
