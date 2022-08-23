import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/interfaces/user-info';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<UserInfo[]> {
    return this.httpClient.get<UserInfo[]>(`/api/users`);
  }

  getUserById(id: string): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(`/api/users/${id}`);
  }

  updateUser(id: number, body: UserInfo) {
    return this.httpClient.put<UserInfo>(`/api/users/${id}`, body);
  }
}
