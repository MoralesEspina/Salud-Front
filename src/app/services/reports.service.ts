import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  authorizationReportGenerate(startDate: string, endDate: string) {
    return this.http.get(`${environment.URL}/reports/authorizations?startdate=${startDate}&enddate=${endDate}`)
  }
}
