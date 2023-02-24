import { IBosses } from './../../../models/person.model';
import { Rol } from '../../../models/rols.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, ThemePalette } from '@angular/material';
import { IUser } from 'src/app/models/edituser.model';
import { WorkService } from 'src/app/services/work.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { AuthBosses } from 'src/app/models/person.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bossesmodal',
  templateUrl: './bossesmodal.component.html',
  styleUrls: ['./bossesmodal.component.scss']
})
export class BossesmodalComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false
  checked = false;
  bosses: IBosses
  roles: Rol[] = []
  authbosses = new AuthBosses()

  formActionSubmmit: string; //create or Actualizar

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BossesmodalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.bosses = data['user']
    this.formActionSubmmit = data.action

  }

  ngOnInit() {
    if (this.formActionSubmmit == 'Actualizar') {
      this.form = this.fb.group({
        nameboss: [this.bosses[0].nameboss, Validators.required],
        namedirector: [this.bosses[0].namedirector, Validators.required],

      }
      );
    }
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
      confirmButtonText: `Si, ${this.formActionSubmmit.toLowerCase()}!`

    }).then((result) => {
      if (result.isConfirmed) {
        this.authbosses = this.form.value
          this.dialogRef.close(this.authbosses);
      }
    })
  }

  close(): void {
    this.dialogRef.close();
  }


}



