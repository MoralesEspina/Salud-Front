import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { IPermission } from '../models/permission';

@Injectable({
  providedIn: 'root'
})
export class RequestpermissionService {

  constructor(private http: HttpClient) { }

  createRequestPermissionService(form:IPermission){
    return this.http.post(`${environment.URL}/permission`,form);
  }

  getOneRequestPermission(uuid: string) {
    return this.http.get(`${environment.URL}/permission/${uuid}`)
  }

  getOneRequestPermissionWithName(uuid: string) {
    return this.http.get(`${environment.URL}/permission/print/${uuid}`)
  }

  getAllRequestPermission(startDate: string, endDate: string): Observable<any>  {
    return this.http.get(`${environment.URL}/permission?startdate=${startDate}&enddate=${endDate}' 23:59:59'`)
  }

  getPermissionsBossOne(uuid: any): Observable<any> {
    return this.http.get(`${environment.URL}/permission/table/bossone/${uuid}`);
  }
  getPermissionsBossTwo(uuid: any): Observable<any> {
    return this.http.get(`${environment.URL}/permission/table/bosstwo/${uuid}`);
  }

  getPermissionsUser(uuid: any): Observable<any> {
    return this.http.get(`${environment.URL}/permission/table/useractive/${uuid}`);
  }
  getPermissionsUserHistory(uuid: any): Observable<any> {
    return this.http.get(`${environment.URL}/permission/table/user/${uuid}`);
  }
  updateOneRequestPermission(form:IPermission, uuid: string) {
    return this.http.put(`${environment.URL}/permission/${uuid}`, form)
  }
  getBossOne(){
    return this.http.get(`${environment.URL}/permission/information/bossone`)
  }
  getBossTwo(){
    return this.http.get(`${environment.URL}/permission/information/bosstwo`)
  }
}
