import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ExperienceI } from '../models/experience.model';


@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  constructor(
    private http: HttpClient
  ) { }

  GetExperience(uuid: any):Observable<ExperienceI[]> {
    return this.http.get<ExperienceI[]>(`${environment.URL}/workExp/${uuid}`)
  }


}

