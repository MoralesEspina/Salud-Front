import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  form: FormGroup;
  title: string;
  component: string;
  submitted: boolean = false
  entityValue: string;
  uuid: string;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WorkComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.component = data.component;

    if (data['isUpdate']) {
      this.entityValue = data.entityValue
    }
    this.uuid = data.uuid
  }

  ngOnInit() {
    this.form = this.fb.group({
      nameentity: [this.entityValue, Validators.required],
    });
  }


  get f() { return this.form.controls }

  save() {
    this.submitted = true;
    if (this.form.invalid) { return; }

    let workjob = {
      name: this.f.nameentity.value,
      component: this.component,
      uuid: this.uuid
    }

    this.dialogRef.close(workjob)

  }

  close(): void {
    this.dialogRef.close();
  }


}
