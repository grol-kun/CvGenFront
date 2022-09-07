import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/interfaces/project';
import { Response } from '../models/interfaces/response';
import { ProjectBody } from '../models/interfaces/project-body';
import { Skill } from '../models/interfaces/skill';
import { FormGroup } from '@angular/forms';
import { ResponseOneEntity } from '../models/interfaces/response-one-entity';
import { POPULATE } from '../models/constants/populate';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<Response<Project>> {
    return this.httpClient.get<Response<Project>>(`/api/projects${POPULATE}`);
  }

  getProjectById(id: string | number): Observable<ResponseOneEntity<Project>> {
    return this.httpClient.get<ResponseOneEntity<Project>>(`/api/projects/${id}${POPULATE}`);
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

    const { description, domain, internalName, name, dateGroup } = form.getRawValue();

    const project: ProjectBody = {
      data: { description, domain, internalName, name, from: dateGroup.from, to: dateGroup.to, skills },
    };

    return project;
  }
}
