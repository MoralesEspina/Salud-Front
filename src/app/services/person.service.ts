import { IBosses } from './../models/person.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IUser } from '../models/edituser.model';
import { IPerson } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private http: HttpClient
  ) { }

  CreatePerson(person: IPerson) {
    return this.http.post(`${environment.URL}/persons`, JSON.stringify(person))
  }

  ManyPersons(page?: number, limit?: string, filter?: string,) {
    var URL = `${environment.URL}/persons?page=${page || 1}&limit=${limit || 10}&filter=${filter || ''}`
    return this.http.get(URL)
  }

  ManyPersonsWithFullData(page?: number, limit?: string, filter?: string,) {
    var URL = `${environment.URL}/persons/information/full?page=${page || 1}&limit=${limit || 10}&filter=${filter || ''}`
    return this.http.get(URL)
  }

  OnePerson(uuid: string) {
    return this.http.get(`${environment.URL}/persons/${uuid}`)
  }

  UpdatePerson(person: IPerson, uuid: string) {
    return this.http.put(`${environment.URL}/persons/${uuid}`, JSON.stringify(person))
  }

  CreateSubstitute(person) {
    return this.http.post(`${environment.URL}/substitutes`, JSON.stringify({ fullname: person.toUpperCase() }))
  }

  GetSubstitutes() {
    return this.http.get(`${environment.URL}/substitutes`)
  }

  GetNamePerson() {
    return this.http.get(`${environment.URL}/nameperson`)
  }

  GetNamePersonForUser() {
    return this.http.get(`${environment.URL}/users/namepersons`)
  }

  ValidationCertify(uuid: string) {
    return this.http.get(`${environment.URL}/validation/certify/${uuid}`)
  }

  GetAuthBosses() {
    return this.http.get(`${environment.URL}/authorizations/authbosses`)
  }

  UpdateAuthBosses(bosses:IBosses) {
    return this.http.put(`${environment.URL}/authorizations/authbosses`, JSON.stringify(bosses))
  }

}

