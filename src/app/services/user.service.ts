import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Claims } from '../models/claims.model';
import { CurriculumDataI } from '../models/curriculum.model';
import { IUser } from '../models/edituser.model';
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

  users1() {
    return this.http.get(`${environment.URL}/users/admins`)
  }

  users2() {
    return this.http.get(`${environment.URL}/users/employees`)
  }
  users3() {
    return this.http.get(`${environment.URL}/users/bosses`)
  }

  changePassword(actual_password: string, new_password: string) {
    let newCredentials = {
      actual_password: actual_password,
      new_password: new_password
    }
    return this.http.post(`${environment.URL}/users/changepassword`, JSON.stringify(newCredentials))
  }

  UpdateUser(user:IUser, uuid: string) {
    return this.http.put(`${environment.URL}/users/${uuid}`, JSON.stringify(user))
  }

  OneUser(uuid: string) {
    return this.http.get(`${environment.URL}/users/${uuid}`)
  }
  ManyPersons(page?: number, limit?: string, filter?: string,) {
    var URL = `${environment.URL}/users?page=${page || 1}&limit=${limit || 10}&filter=${filter || ''}`
    return this.http.get(URL)
  }

  crearCurriculum(curriculum: CurriculumDataI) {
    return this.http.post(`${environment.URL}/curriculums`, JSON.stringify(curriculum))
  }

  deleteUser(uuid: string) {
    return this.http.delete(`${environment.URL}/users/${uuid}`)
  }

  deleteCurriculum(uuid: string) {
    return this.http.delete(`${environment.URL}/curriculums/${uuid}`)
  }

}
