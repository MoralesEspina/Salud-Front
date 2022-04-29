import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { environment } from 'src/environments/environment.prod';
import { IAuthorization } from '../models/authorization';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  authorization = new IAuthorization()
  constructor(
    private http: HttpClient
  ) { }

  createAuthorization(data) {
    this.authorization = data
    this.authorization.submitted_at = dayjs(data.submitted_at).format('YYYY-MM-DD')
    this.authorization.startdate = dayjs(data.startdate).format('YYYY-MM-DD')
    this.authorization.enddate = dayjs(data.enddate).format('YYYY-MM-DD')
    this.authorization.resumework = dayjs(data.resumework).format('YYYY-MM-DD')

    return this.http.post(`${environment.URL}/authorizations`, JSON.stringify(this.authorization))
  }

  formatDate(date): string {
    var emitteddate = new Date(date)
    return `${emitteddate.getFullYear()}-${emitteddate.getMonth() + 1}-${emitteddate.getDate()}`
  }

  ManyAuthorization() {
    return this.http.get(`${environment.URL}/authorizations`)
  }

  OneAuthorization(uuid: string) {
    return this.http.get(`${environment.URL}/authorizations/${uuid}`)
  }

  UpdateAuthorization(data, uuid) {
    data.submitted_at = dayjs(data.submitted_at).format('YYYY-MM-DD')
    data.enddate = dayjs(data.enddate).format('YYYY-MM-DD')
    data.startdate = dayjs(data.startdate).format('YYYY-MM-DD')
    data.resumework = dayjs(data.resumework).format('YYYY-MM-DD')

    return this.http.put(`${environment.URL}/authorizations/${uuid}`, JSON.stringify(data))
  }

  printPDF(uuid) {
    return this.http.get(`${environment.URL}/authorizations/pdfauthorization/${uuid}`)
  }

  IAuthorization: IAuthorization
  getAuthorizationInformation(uuid: string) {
    return this.http.get(`${environment.URL}/authorizations/pdfauthorization/${uuid}`)
  }


  SendConfigurationFile(data, url) {
    return this.http.post(`${environment.URLCustomForms}/das-jalapa/${url}/configuration`, data)
  }

  GetConfigurationFile(url) {
    return this.http.get(`${environment.URLCustomForms}/das-jalapa/${url}/configuration`)
  }
}
