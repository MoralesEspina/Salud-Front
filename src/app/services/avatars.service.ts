import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AvatarsService {

  constructor(private Http: HttpClient) { }


  GetAvatar() {
    return this.Http.get(`${environment.URLCustomForms}/das-jalapa/avatar`)
  }

  UploadAvatar(avatar){
    return this.Http.post(`${environment.URLCustomForms}/das-jalapa/avatar`, avatar)
  }

  UploadPermission(avatar){
    return this.Http.post(`${environment.URLCustomForms}/das-jalapa/avatar`, avatar)
  }
}

