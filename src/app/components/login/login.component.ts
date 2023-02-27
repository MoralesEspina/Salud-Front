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
    html: '<div style="display:flex;place-items:center;margin-bottom: 10px;"><img src="https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/avatars%2FInfo%2FCristian.png?alt=media&token=d1a4b569-2435-471e-a20f-d7c98f11d131" style="width:55px"> <span style="text-align: left; margin-left:20px">Gestión y coordinación:<br>Cristian Jiaan Caarlo Lopez Marroquín<br>jiaancaarlo2711@gmail.com</span></div>' +
    '<div style="display:flex;align-items:center;margin-bottom: 10px;"><img src="https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/avatars%2FInfo%2FMynor.png?alt=media&token=e86e9bdb-9bcf-48de-9973-d8d6ba7507f3" style="width:55px"> <span style="text-align: left; margin-left:20px">Version 1.0:<br>Mynor Aroldo Castrillo Maldonado<br>mynor2397cas@gmail.com</span></div>' +
    '<div style="display:flex;align-items:center;margin-bottom: 10px;"><img src="https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/avatars%2FInfo%2FEsdras.png?alt=media&token=d4008e94-3df4-4615-972f-af3b6a6450b6" style="width:55px; "> <span style="text-align: left; margin-left:20px">Version 2.0:<br>Esdras Mefiboseth Morales Espina<br>moralesespina92@gmail.com</span></div>'+
    '<div style="display:flex;align-items:center;margin-bottom: 10px;"><img src="https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/avatars%2FInfo%2FDylan.png?alt=media&token=e4cffe26-f7e9-4986-8855-7ae5878b11e8" style="width:55px;"> <span style="text-align: left; margin-left:20px ">Dylan Alexis Tobar Orellana<br>dylantobar2001@gmail.com</span></div>',
    });
    }
}
