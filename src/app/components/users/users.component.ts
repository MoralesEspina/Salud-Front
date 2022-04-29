import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from 'src/app/models/rols.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  title: string
  user = new User()
  users: User[] = []


  submitted: boolean = false;
  error: string = '';

  rols: Rol[] = []

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.getrols()
    this.getUsers()

    this.form = this.fb.group({
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      id_rol: [this.user.id_rol, Validators.required]
    })
  }

  get f() { return this.form.controls }

  save() {
    this.submitted = true
    if (this.form.invalid) { return }

    this.user = this.form.value
    this.user.id_rol = parseInt(`${this.user.id_rol}`)

    this.userService.crearUsuario(this.user)
      .subscribe(data => {
        this.getUsers()
        this.form.reset()
        Swal.fire({
          icon: 'success',
          title: '<span style="color: white; "> Usuario creado correctamente </span>',
          toast: true,
          showConfirmButton: false,
          position: 'top-end',
          timer: 1500,
          timerProgressBar: true,
          background: '#68d391',
        })
      }, (err) => {
        if (err == 'User already exists') {
          Swal.fire({
            icon: 'error',
            title: 'Este usuario ya existe!',
            timer: 2000,
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Fallo al crear el usuario',
            timer: 2000,
          })
        }
      })
  }

  getrols() {
    this.userService.rols()
      .subscribe(data => {
        this.rols = data['data']
      }, err => console.log(err))
  }

  getUsers() {
    this.userService.users()
      .subscribe(data => {
        this.users = data['data']
      }, err => console.log(err))
  }
}
