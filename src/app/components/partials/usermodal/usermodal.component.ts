import { Rol } from './../../../models/rols.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, ThemePalette } from '@angular/material';
import { IUser } from 'src/app/models/edituser.model';
import { WorkService } from 'src/app/services/work.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermodal',
  templateUrl: './usermodal.component.html',
  styleUrls: ['./usermodal.component.scss']
})
export class UsermodalComponent implements OnInit {

  form: FormGroup;
  title: string;
  id: string
  component: string
  submitted: boolean = false
  color: ThemePalette = 'primary';
  checked = false;

  user: IUser
  actualUser: IUser
  roles: Rol[] = []
  user2 = new User()


  formActionSubmmit: string; //create or Actualizar

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private dialogRef: MatDialogRef<UsermodalComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.actualUser = data['user']
    this.user = data['user']
    this.formActionSubmmit = data.action

  }

  ngOnInit() {

    if (this.formActionSubmmit == 'Actualizar') {
      this.form = this.fb.group({
        username: [this.user.username, Validators.required],
        rol: [this.user.role, Validators.required],
        id_rol: [this.user2.id_rol, Validators.required],
        pasword: '',


      }
      );
    }
    this.manyRols();


  }

  get f() { return this.form.controls }

  save() {
    this.submitted = true;
    if (this.form.invalid) { return; }
    Swal.fire({
      title: '¿Estás seguro?',
      text: `${this.formActionSubmmit} el registro!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4299e1',
      cancelButtonColor: '#f56565',
      cancelButtonText: "Cancelar",
      confirmButtonText: `si, ${this.formActionSubmmit.toLowerCase()}!`

    }).then((result) => {
      if (result.isConfirmed) {
        this.user2 = this.form.value
        this.user2.id_rol = parseInt(`${this.user2.id_rol}`)


        this.dialogRef.close(this.user2);
      }
    })

  }

  close(): void {
    this.dialogRef.close();
  }


  manyRols() {
    this.userService.rols()
      .subscribe(data => {
        this.roles = data['data']
      })
  }


}



