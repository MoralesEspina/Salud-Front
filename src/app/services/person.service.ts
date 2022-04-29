import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
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

  ValidationCertify(uuid: string) {
    return this.http.get(`${environment.URL}/validation/certify/${uuid}`)
  }
}

