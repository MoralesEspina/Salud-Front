import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RequestVacationService {

  constructor(private http: HttpClient) { }

  createRequestVacationService(requestVacation) {
    let data = {
      "last_vacation_from": requestVacation.last_vacation_from,
      "last_vacation_to": requestVacation.last_vacation_to,
      "last_year_vacation": requestVacation.last_year_vacation,
      "vacation_year_request": requestVacation.vacation_year_request,
      "vacation_from_date": requestVacation.vacation_from_date,
      "vacation_to_date": requestVacation.vacation_to_date,
      "has_vacation_day": requestVacation.has_vacation_day,
      "days_quantity": requestVacation.days_quantity,
      "observations": requestVacation.observations,
      "person": {
        "uuid": requestVacation.person.uuid
      },
      "person_server": {
        "uuid": requestVacation.person_server.uuid
      }
    }
    return this.http.post(`${environment.URL}/requestvacations`, JSON.stringify(data))
  }

  updateRequestVacationService(requestVacation, uuid) {
    let data = {

      "last_vacation_from": requestVacation.last_vacation_from,
      "last_vacation_to": requestVacation.last_vacation_to,
      "last_year_vacation": requestVacation.last_year_vacation,
      "vacation_year_request": requestVacation.vacation_year_request,
      "vacation_from_date": requestVacation.vacation_from_date,
      "vacation_to_date": requestVacation.vacation_to_date,
      "has_vacation_day": requestVacation.has_vacation_day,
      "days_quantity": requestVacation.days_quantity,
      "observations": requestVacation.observations,
      "person_server": {
        "uuid": requestVacation.person_server.uuid
      }
    }
    return this.http.put(`${environment.URL}/requestvacations/${uuid}`, JSON.stringify(data))
  }

  getRequestVacations() {
    return this.http.get(`${environment.URL}/requestvacations`)
  }

  getOneRequestVacations(uuid: string) {
    return this.http.get(`${environment.URL}/requestvacations/${uuid}`)
  }

  DeleteOneRequestVacations(uuid: string) {
    return this.http.delete(`${environment.URL}/requestvacations/${uuid}`)
  }
}
