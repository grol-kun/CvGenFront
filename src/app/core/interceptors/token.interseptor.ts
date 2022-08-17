import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class TokenInterseptor implements HttpInterceptor {

  constructor(
    private authServise: AuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({ url: `${environment.baseUrl}${req.url}` });

    if (this.authServise.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authServise.getToken()}`
        }
      });
    }
    return next.handle(req)
  }

}
