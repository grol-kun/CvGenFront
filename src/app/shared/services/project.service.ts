import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/interfaces/project';
import { Response } from '../models/interfaces/response';
import { ResponseProject } from '../models/interfaces/response-project';
import { ProjectBody } from '../models/interfaces/project-body';
import { Skill } from '../models/interfaces/skill';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<Response<Project>> {
    return this.httpClient.get<Response<Project>>(`/api/projects`);
  }

  getProjectById(id: string | number): Observable<ResponseProject> {
    return this.httpClient.get<ResponseProject>(`/api/projects/${id}`);
  }

  updateProject(id: string | number, body: ProjectBody) {
    return this.httpClient.put<Project>(`/api/projects/${id}`, body);
  }

  addNewProject(body: ProjectBody) {
    return this.httpClient.post(`/api/projects`, body);
  }

  deleteProjectById(id: string | number) {
    return this.httpClient.delete(`/api/projects/${id}`);
  }

  makeRequestBody(form: FormGroup, SkillList: Skill[]): ProjectBody {
    const skills = form
      .getRawValue()
      .skills.map((skillName: string) => SkillList.find((elem) => elem.attributes.name === skillName));

    const project: ProjectBody = { data: { ...form.getRawValue(), skills } };
    return project;
  }
}
