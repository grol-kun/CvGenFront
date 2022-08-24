import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/interfaces/project';
import { Response } from '../models/interfaces/response';
import { ResponseProjectById } from '../models/interfaces/response-by-id';
import { ProjectPutRequestBody } from '../models/interfaces/project-put-request-body';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<Response<Project>> {
    return this.httpClient.get<Response<Project>>(`/api/projects`);
  }

  getProjectById(id: string | number): Observable<ResponseProjectById> {
    return this.httpClient.get<ResponseProjectById>(`/api/projects/${id}`);
  }

  updateProject(id: string | number, body: ProjectPutRequestBody) {
    return this.httpClient.put<Project>(`/api/projects/${id}`, body);
  }

  addNewProject(body: ProjectPutRequestBody) {
    return this.httpClient.post(`/api/projects/`, body);
  }

  deleteProjectById(id: string | number) {
    return this.httpClient.delete(`/api/projects/${id}`);
  }
}
