import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Project } from '../models/interfaces/project';
import { Response } from '../models/interfaces/response';
import { Cv } from '../models/interfaces/cv';
import { ResponseOneEntity } from '../models/interfaces/response-one-entity';
import { POPULATE } from '../models/constants/populate';
import { CvBody } from '../models/interfaces/cv-body';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  constructor(private httpClient: HttpClient) {}

  getCvs(): Observable<Cv[]> {
    return this.httpClient.get<Response<Cv>>(`/api/cvs${POPULATE}`).pipe(map((data) => data.data));
  }

  getCvById(id: string | number): Observable<ResponseOneEntity<Cv>> {
    return this.httpClient.get<ResponseOneEntity<Cv>>(`/api/cvs/${id}${POPULATE}`);
  }

  updateCv(id: string | number, body: CvBody) {
    return this.httpClient.put<Project>(`/api/cvs/${id}`, body);
  }

  addNewCv(body: CvBody) {
    return this.httpClient.post(`/api/cvs`, body);
  }

  deleteCvById(id: string | number) {
    return this.httpClient.delete(`/api/cvs/${id}`);
  }
}
