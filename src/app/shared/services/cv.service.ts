import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/interfaces/project';
import { Response } from '../models/interfaces/response';
import { ProjectBody } from '../models/interfaces/project-body';
import { Cv } from '../models/interfaces/cv';
import { ResponseOneEntity } from '../models/interfaces/response-one-entity';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  constructor(private httpClient: HttpClient) {}

  getCvs(): Observable<Response<Cv>> {
    return this.httpClient.get<Response<Cv>>(`/api/cvs`);
  }

  getCvById(id: string | number): Observable<ResponseOneEntity<Cv>> {
    return this.httpClient.get<ResponseOneEntity<Cv>>(`/api/cvs/${id}`);
  }

  updateCv(id: string | number, body: ProjectBody) {
    return this.httpClient.put<Project>(`/api/cvs/${id}`, body);
  }

  addNewCv(body: ProjectBody) {
    return this.httpClient.post(`/api/cvs`, body);
  }

  deleteCvById(id: string | number) {
    return this.httpClient.delete(`/api/cvs/${id}`);
  }
}
