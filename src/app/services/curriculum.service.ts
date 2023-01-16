import { ReferenceI } from 'src/app/models/references.model';
import { EducationI } from './../models/personEducation.model';
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

  createPersonEducation(form:EducationI){
    return this.http.post(`${environment.URL}/personEducation`,form);
  }

  createRef(form:ReferenceI){
    return this.http.post(`${environment.URL}/references/refFam`,form);
  }

  createWorkExp(form:ExperienceI){
    return this.http.post(`${environment.URL}/workExp`,form);
  }

  editCurriculum(form:CurriculumDataI, uuid: any){
    return this.http.put(`${environment.URL}/curriculums/${uuid}`,form);
  }

  GetCurriculum(uuid: any):Observable<CurriculumDataI[]> {
    return this.http.get<CurriculumDataI[]>(`${environment.URL}/curriculums/${uuid}`)
  }

  GetEducation(uuid: any):Observable<EducationI[]> {
    return this.http.get<EducationI[]>(`${environment.URL}/personEducation/${uuid}`)
  }

  deleteEducation(uuid: any){
    return this.http.delete(`${environment.URL}/personEducation/${uuid}`)
  }

  GetExperience(uuid: any):Observable<ExperienceI[]> {
    return this.http.get<ExperienceI[]>(`${environment.URL}/workExp/${uuid}`)
  }

  deleteExperience(uuid: any){
    return this.http.delete(`${environment.URL}/workExp/${uuid}`)
  }

  GetRefFam(uuid: any):Observable<ReferenceI[]> {
    return this.http.get<ReferenceI[]>(`${environment.URL}/references/refFam/${uuid}`)
  }

  deleteRefFam(uuid: any){
    return this.http.delete(`${environment.URL}/references/refFam/${uuid}`)
  }

  GetRefPer(uuid: any):Observable<ReferenceI[]> {
    return this.http.get<ReferenceI[]>(`${environment.URL}/references/refPer/${uuid}`)
  }

  deleteRefPer(uuid: any){
    return this.http.delete(`${environment.URL}/references/refPer/${uuid}`)
  }

}

