import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillResponse } from '../models/interfaces/skill-response';
import { SkillResponseById } from '../models/interfaces/skill-response-by-id';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private httpClient: HttpClient) {}

  getFullList(): Observable<SkillResponse> {
    return this.httpClient.get<SkillResponse>('/api/skills');
  }

  getItemById(id: string): Observable<SkillResponseById> {
    return this.httpClient.get<SkillResponseById>(`/api/skills/${id}`);
  }
}
