import { Injectable, Type } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';



@Injectable()
export class Statuserror implements HttpInterceptor {

  constructor(private authService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
        .pipe(catchError(err=>{
            if ([401, 402].indexOf(err.status) !== -1){
                this.authService.logout();
                location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error)
        }))
  }
}
