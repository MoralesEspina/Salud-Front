import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IWork } from '../models/work.model';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private workEntity: BehaviorSubject<IWork>
  public work: Observable<IWork>

  constructor(
    private http: HttpClient
  ) {
    this.workEntity = new BehaviorSubject<IWork>(new IWork);
    this.work = this.workEntity.asObservable();
  }

  public get dataWork(): IWork {
    return this.workEntity.value;
  }

  getWorks() {
    return this.http.get(`${environment.URL}/works`)
  }

  getJobs() {
    return this.http.get(`${environment.URL}/jobs`)
  }

  getEspecialities() {
    return this.http.get(`${environment.URL}/especialities`)
  }

  createJobOrWork(data, URL) {

    return this.http.post(`${environment.URL}/${URL}`, JSON.stringify(data))
  }

  /**
   * 
   * Updated actions for work_dependency or job
  */
  updateJobOrWork(data: string, URL: string, uuid: string) {
    return this.http.put(`${environment.URL}/${URL}/${uuid}`, JSON.stringify(data))
  }


  /**
   * Delete actions http for work_dependency or job
   */

  deleteJob(uuid: string) {
    return this.http.delete(`${environment.URL}/jobs/${uuid}`)
  }

  deleteWorkDependency(uuid: string) {
    return this.http.delete(`${environment.URL}/works/${uuid}`)
  }
}
