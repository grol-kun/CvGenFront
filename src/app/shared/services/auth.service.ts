import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthorizationResponse } from '../models/interfaces/authorization-response';
import { loginInfo } from '../models/interfaces/login-info';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  login(userData: loginInfo): Observable<AuthorizationResponse> {
    return this.httpClient.post<AuthorizationResponse>(`/api/auth/local`, userData);
  }

  setToken(token: string): void {
    this.token = token;
  }

  removeToken(): void {
    this.token = null;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    const token = this.token;
    return !!token;
  }

  setTokenToCookies(token: string): void {
    this.cookieService.setCookie(environment.TokenName, token)
  }

  getTokenFromCookies(): string {
    return this.cookieService.getCookie(environment.TokenName);
  }

  logout(): void {
    this.removeToken();
    this.cookieService.deleteCookie(environment.TokenName);
  }

}
