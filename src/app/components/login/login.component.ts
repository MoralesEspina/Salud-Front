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
}
