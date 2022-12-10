import { Injectable } from '@angular/core';
import { SweetAlertService } from './sweetAlert.service';

@Injectable({
  providedIn: 'root'
})

export class ErrorsService {

  constructor(private _sweetAlertService:SweetAlertService
  ) {

  }

  error(data_response) {
    if (data_response.status == 403) {
      let message = '';
      data_response.error.data.forEach((element,index) => {
        message += index+1 + '. ' + element.msg + '<br/>'
      });
      this._sweetAlertService.deleteOneError('Parece que ingresaste mal un campo',message)
    } else if (data_response.status == 500){
      this._sweetAlertService.error('Parece que algo salio mal');
    } else if (data_response.status == 404){
      this._sweetAlertService.error(data_response.error.message);
    }
  }
}
