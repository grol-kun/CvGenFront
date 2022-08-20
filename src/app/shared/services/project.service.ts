import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectInfoResponse } from '../models/interfaces/project-info';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<ProjectInfoResponse> {
    return this.httpClient.get<ProjectInfoResponse>(`/api/projects`);
  }
}
