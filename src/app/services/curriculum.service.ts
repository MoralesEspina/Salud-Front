import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  constructor(private http: HttpClient) { }

  GetSubstitutes(uuid: string) {
    return this.http.get(`${environment.URL}/curriculums/${uuid}`)
  }

}
