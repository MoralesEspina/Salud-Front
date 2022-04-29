import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Claims } from '../models/claims.model';
import { User } from '../models/user.model';
import { LocalService } from '../services/local.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<Claims>;
  public user: Observable<Claims>;

  constructor(private http: HttpClient, private localStorage: LocalService) {
    this.userSubject = new BehaviorSubject<Claims>(JSON.parse(localStorage.getJsonValue('claims')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Claims {
    return this.userSubject.value;
  }

  login(user: User) {
    return this.http.post<Claims>(`${environment.URL}/login`, JSON.stringify(user))
      .pipe(map(Claims => {
        if (Claims && Claims.token) {
          this.localStorage.setJsonValue('claims', JSON.stringify(Claims));
          this.userSubject.next(Claims)
        }

        return Claims;
      }))
  }

  logout() {
    this.localStorage.clearToken();
    this.userSubject.next(null);
  }

  crearUsuario(user: User) {
    return this.http.post(`${environment.URL}/users/register`, JSON.stringify(user))
  }

  rols() {
    return this.http.get(`${environment.URL}/users/rols`)
  }

  users() {
    return this.http.get(`${environment.URL}/users`)
  }

  changePassword(actual_password: string, new_password: string) {
    let newCredentials = {
      actual_password: actual_password,
      new_password: new_password
    }
    return this.http.post(`${environment.URL}/users/changepassword`, JSON.stringify(newCredentials))
  }
}
