import { Education } from './../models/personEducation.model';
import { CurriculumDataI } from '../models/curriculum.model';
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

  GetCurriculum(uuid: any):Observable<CurriculumDataI[]> {
    return this.http.get<CurriculumDataI[]>(`${environment.URL}/curriculums/${uuid}`)
  }

  GetEducation(uuid: any):Observable<Education[]> {
    return this.http.get<Education[]>(`${environment.URL}/personEducation/${uuid}`)
  }

  GetExperience(uuid: any):Observable<ExperienceI[]> {
    return this.http.get<ExperienceI[]>(`${environment.URL}/workExp/${uuid}`)
  }


}

