import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/interfaces/response';
import { Responsibility } from '../models/interfaces/responsibility';

@Injectable({
  providedIn: 'root',
})
export class ResponsibilityService {
  constructor(private httpClient: HttpClient) {}

  getResponsibilities(): Observable<Response<Responsibility>> {
    return this.httpClient.get<Response<Responsibility>>(`/api/responsibilities`);
  }
}
