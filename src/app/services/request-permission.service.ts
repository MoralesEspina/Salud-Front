import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RequestpermissionService {

  constructor(private http: HttpClient) { }

updateRequestPermissionService(requestPermission, uuid) {
  let data = {

    "last_vacation_from": requestPermission.last_vacation_from,
    "last_vacation_to": requestPermission.last_vacation_to,
    "last_year_vacation": requestPermission.last_year_vacation,
    "vacation_year_request": requestPermission.vacation_year_request,
    "vacation_from_date": requestPermission.vacation_from_date,
    "vacation_to_date": requestPermission.vacation_to_date,
    "has_vacation_day": requestPermission.has_vacation_day,
    "days_quantity": requestPermission.days_quantity,
    "observations": requestPermission.observations,
    "person_server": {
      "uuid": requestPermission.person_server.uuid
    }
  }
  return this.http.put(`${environment.URL}/requestvacations/${uuid}`, JSON.stringify(data))
}
}
