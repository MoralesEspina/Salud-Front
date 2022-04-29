import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Claims } from 'src/app/models/claims.model';
import { AvatarsService } from 'src/app/services/avatars.service';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { UploadavatarComponent } from '../uploadavatar/uploadavatar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loged: boolean = false;
  active: boolean = false
  user: Claims = new Claims();
  urlImage: string;

  isClicked: boolean = true;
  isClickedReportes: boolean = true;
  constructor(
    private userService: UserService,
    private router: Router,
    private avatar: AvatarsService,
    private dialog: MatDialog, 
    private localService: LocalService) { }

  ngOnInit() {
    if (this.userService.userValue) {
      this.loged = true;
      this.user.rol = this.userService.userValue.rol;

      this.urlImage = this.localService.getJsonValue('avatar');

      if (!this.urlImage) {
        this.avatar.GetAvatar().subscribe(data => {
          this.urlImage = data['data'];
          this.localService.setJsonValue('avatar', this.urlImage);
        }, err => console.log(err));
      }

    }

  }

  Logout() {
    this.userService.logout()
    this.router.navigateByUrl('/login')
  }

  DisplayNone() {
    this.active = !this.active
    this.isClicked = !this.isClicked
  }

  DisplayNoneReportes() {
    this.active = !this.active
    this.isClicked = !this.isClicked
  }

  formData: any = new FormData();
  async UploadAvatar() {
    const modalDialog = this.dialog.open(UploadavatarComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px',

    })

    modalDialog.afterClosed().subscribe(
      data => {
        if (data) {
          this.urlImage = data['data'].imageURL
          this.localService.setJsonValue('avatar', this.urlImage);
        }
      },
      err => console.log(err))
  }
  async changePassword() {
    const { value: formValues } = await Swal.fire({
      title: 'Cambiar contraseña',
      html:
        '<input id="swal-input1" class="input-gray focus:outline-none focus:border-blue-400 my-2 h-16" placeholder="Contraseña actual" type="password">' +
        '<input id="swal-input2" class="input-gray focus:outline-none focus:border-blue-400 my-2 h-16" placeholder="Nueva contraseña" type="password">',
      focusConfirm: true,
      confirmButtonText: 'Confirmar',
      showCloseButton: true,
      preConfirm: () => {
        return [
          {
            actualPass: document.getElementById('swal-input1')['value'],
            newPass: document.getElementById('swal-input2')['value']
          }
        ]
      }
    })

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    if (formValues) {
      if (formValues[0].actualPass != '' || formValues[0].newPass != '') {
        this.userService.changePassword(formValues[0].actualPass, formValues[0].newPass)
          .subscribe(data => {
            Swal.close();
            this.Logout();
          }, err => {
            Swal.fire({
              icon: 'error',
              text: 'La contraseña es incorrecta'
            });
          })
      } else {
        Swal.close();
        Swal.fire({
          icon: 'warning',
          text: 'Sus credenciales están incompletas',
          timer: 2000
        });
      }
    } else {
      Swal.close();
    }
  }

}
