import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthorizationResponse } from '../models/interfaces/authorization-response';
import { loginInfo } from '../models/interfaces/login-info';
import { CookieService } from 'ngx-cookie';
import { ExpireDateService } from './expire-date.service';
import { Store } from '@ngrx/store';
import { removeToken, setToken } from 'src/app/core/store/actions/auth.actions';
import { tokenSelector } from 'src/app/core/store/selectors/auth.selector';
import { MyInfo } from '../models/interfaces/my-info';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private expDate: ExpireDateService,
    private store: Store
  ) {}

  login(userData: loginInfo): Observable<AuthorizationResponse> {
    return this.httpClient.post<AuthorizationResponse>(`/api/auth/local`, userData);
  }

  setToken(token: string): void {
    this.store.dispatch(setToken({ token }));
  }

  removeToken(): void {
    this.store.dispatch(removeToken());
  }

  getToken(): Observable<string | null> {
    return this.store.select(tokenSelector);
  }

  setTokenToCookies(token: string): void {
    this.cookieService.put(environment.tokenName, token, { secure: true, expires: this.expDate.getExpireDate() });
  }

  getTokenFromCookies(): string | undefined {
    return this.cookieService.get(environment.tokenName);
  }

  setTokenIfAvailable() {
    const potentialToken = this.getTokenFromCookies();
    if (potentialToken) {
      this.setToken(potentialToken);
    }
  }

  logout(): void {
    this.removeToken();
    this.cookieService.remove(environment.tokenName);
    this.router.navigate(['/auth']);
  }

  getMyInfo(): Observable<MyInfo> {
    return this.httpClient.get<MyInfo>(`/api/users/me`);
  }
}
