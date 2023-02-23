import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User()
  loginForm: FormGroup;
  submitted: boolean = false;
  returnURL: string = ''
  error: string = '';

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authUser: UserService) {
    if (this.authUser.userValue) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.returnURL = this.route.snapshot.queryParamMap['returnURL'] || '/'
  }

  get f() { return this.loginForm.controls }

  login() {
    this.submitted = true
    if (this.loginForm.invalid) { return }

    this.user.username = this.f.username.value;
    this.user.password = this.f.password.value;


    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.authUser.login(this.user)
      .pipe(first())
      .subscribe(resp => {

        Swal.close();
        this.router.navigate([this.returnURL]);

      }, err => {
        this.error = err;
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticarte',
          text: 'Usuario o contraseña inválidos'
        });
        console.log(err)
      })
  }
  showMessage() {
    Swal.fire({
    title: 'Proyecto DAS Jalapa',
    confirmButtonText: 'Cerrar',
    html: '<div style="display:flex;place-items:center;margin-bottom: 10px;"><img src="https://images.vexels.com/media/users/3/144010/isolated/preview/ef462bc0caf75dc40f16f1528df3b8a6-icono-de-trazo-de-dinero-dolar.png" style="width:50px"> <span style="text-align: left; margin-left:20px">Idea y coordinación:<br>Cristian Jiaan Caarlo Lopez Marroquin<br>@gmail.com</span></div>' +
    '<div style="display:flex;align-items:center;margin-bottom: 10px;"><img src="https://icon-library.com/images/programing-icon/programing-icon-10.jpg" style="width:50px"> <span style="text-align: left; margin-left:20px">Version 1.0:<br>Mynor<br>@gmail.com</span></div>' +
    '<div style="display:flex;align-items:center;margin-bottom: 5px;"><img src="https://64.media.tumblr.com/30488689ab7ea04f2dad17ff3b25bb8b/tumblr_n76suhUhqN1trlsqfo1_500.png" style="width:55px; margin-top:30px"> <span style="text-align: left; margin-left:15px">Version 2.0:<br>Esdras Mefiboseth Morales Espina<br>moralesespina92@gmail.com</span></div>'+
    '<div style="display:flex;align-items:center;margin-bottom: 10px;"><img src="https://i.imgflip.com/57yw2j.png" style="width:70px; margin-left:-10px"> <span style="text-align: left; margin-left:10px">Dylan Alexis Tobar Orellana<br>dylantobar2001@gmail.com</span></div>',
    });
    }
}
