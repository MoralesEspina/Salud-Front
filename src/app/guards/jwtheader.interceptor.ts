import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../services/user.service';

@Injectable()
export class Jwtheader implements HttpInterceptor {
  constructor(private authService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authService.userValue;
    const isLoggedIn = user && user.token;

    const isApiUrl = request.url.startsWith(environment.URL);
    const isCustomFormURL = request.url.startsWith(environment.URLCustomForms);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        }
      });
    }

    if (isLoggedIn && isCustomFormURL) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${user.token}`,
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return next.handle(request);
  }
}