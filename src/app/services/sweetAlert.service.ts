import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class SweetAlertService {

  constructor(private _router:Router
  ) {

  }
  //TODO ESTATUS DE RESPUESTA ESPERADO 200
  login(titulo) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: titulo,
      showConfirmButton: false,
      timer: 1000
    })
    this._router.navigate(['dashboard']);
    setTimeout(()=>{                           // <<<---using ()=> syntax
      window.location.reload()
  }, 800);
  }

  logout(titulo) {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: titulo,
      showConfirmButton: false,
      timer: 1000
    })
    this._router.navigate(['login']);
    setTimeout(()=>{                           // <<<---using ()=> syntax
      window.location.reload()
  }, 200);
  }

  createAndUpdate(titulo) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: titulo,
      showConfirmButton: false,
      timer: 1000
    })
  }

  deleteOneConfirmation(titulo) {
    Swal.fire({
      icon: 'success',
      title: titulo,
    })
  }

  deleteOneError(titulo, error) {
    Swal.fire({
      icon: 'error',
      title: titulo,
      html: error,
    })
  }

  error(titulo) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: titulo,
      showConfirmButton: false,
      timer: 1000
    })
  }

  warning(titulo) {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: titulo,
      showConfirmButton: false,
      timer: 1000
    })
  }

}
