import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { POPULATE } from '../models/constants/populate';
import { UserInfo } from '../models/interfaces/user-info';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<UserInfo[]> {
    return this.httpClient.get<UserInfo[]>(`/api/users${POPULATE}`);
  }

  getUserById(id: string): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(`/api/users/${id}${POPULATE}`);
  }

  updateUser(id: number, body: UserInfo) {
    return this.httpClient.put<UserInfo>(`/api/users/${id}`, body);
  }
}
