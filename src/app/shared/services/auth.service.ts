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
import { getToken, removeToken, setToken } from 'src/app/ngRx/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private expDate: ExpireDateService,
    private store: Store //private store: Store<{ auth: string }>
  ) {}

  login(userData: loginInfo): Observable<AuthorizationResponse> {
    return this.httpClient.post<AuthorizationResponse>(`/api/auth/local`, userData);
  }

  setToken(token: string): void {
    this.token = token;
    this.store.dispatch(setToken());
    console.log('setToken');
  }

  removeToken(): void {
    this.token = null;
    this.store.dispatch(removeToken());
  }

  getToken(): string | null {
    console.log('getToken');
    this.store.dispatch(getToken());
    return this.token;
    //return this.store.dispatch(getToken())
  }

  isAuthenticated(): boolean {
    return !!this.token;
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
}
