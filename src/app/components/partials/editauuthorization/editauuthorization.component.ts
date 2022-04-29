import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as dayjs from 'dayjs';
import { IAuthorization } from 'src/app/models/authorization';
import { IPerson } from 'src/app/models/person.model';
import formatDateToLetter from 'src/app/utils/formats/formatDateToLetter';
import { DocumentComponent } from '../document/document.component';


@Component({
  selector: 'app-editauuthorization',
  templateUrl: './editauuthorization.component.html',
  styleUrls: ['./editauuthorization.component.scss']
})
export class EditauuthorizationComponent implements OnInit {

  emmitedYearAuthorization: string;
  form: FormGroup;
  submitted: boolean = false;
  document = new Document();
  person = new IPerson();
  newAuthorization = new IAuthorization()
  authorizationActual = new IAuthorization()

  bodytext: string = `En respuesta a su solicitud de vacaciones, me dirijo a usted para hacer de su conocimiento que de conformidad a lo que establece el artículo 61 numeral 2, del Decreto 1748. “Ley de Servicio Civil”, Artículo 51 del Acuerdo Gubernativo 18-98 “Reglamento de la citada Ley” se le autorizan vacaciones después de un año de servicios continuos de labores, durante las fechas que a continuación se detallan:`

  years: string[] = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<DocumentComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.person = data.person.person
    this.newAuthorization = data.person
    this.authorizationActual.person = this.person
    this.emmitedYearAuthorization = new Date(this.newAuthorization.submitted_at).getFullYear().toString();
  }

  ngOnInit() {
    this.form = this.fb.group({
      submitted_at: [dayjs(this.newAuthorization.submitted_at).format('YYYY-MM-DD'), []],
      startdate: [dayjs(this.newAuthorization.startdate).format('YYYY-MM-DD'), Validators.required],
      enddate: [dayjs(this.newAuthorization.enddate).format('YYYY-MM-DD'), Validators.required],
      resumework: [dayjs(this.newAuthorization.resumework).format('YYYY-MM-DD'), Validators.required],
      holidays: [this.newAuthorization.holidays, Validators.required],
      total_days: [this.newAuthorization.total_days, Validators.required],
      pendingdays: [this.newAuthorization.pendingdays, Validators.required],
      observation: [this.newAuthorization.observation],
      authorizationyear: [this.newAuthorization.authorizationyear, Validators.required],
      partida: [this.newAuthorization.person.partida, []],
      workdependency: [this.newAuthorization.person.work_dependency.name, Validators.required],
      body: [this.bodytext, []],
      personnelOfficer: [this.newAuthorization.personnelOfficer, Validators.required],
      personnelOfficerPosition: [this.newAuthorization.personnelOfficerPosition, Validators.required],
      personnelOfficerArea: [this.newAuthorization.personnelOfficerArea, Validators.required],
      executiveDirector: [this.newAuthorization.executiveDirector, Validators.required],
      executiveDirectorPosition: [this.newAuthorization.executiveDirectorPosition, Validators.required],
      executiveDirectorArea: [this.newAuthorization.executiveDirectorArea, Validators.required],
    })
  }

  get f() { return this.form.controls }

  save() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }
    this.newAuthorization = this.form.value
    this.newAuthorization.person = this.person;
    if (!this.newAuthorization.submitted_at) { this.newAuthorization.submitted_at = this.authorizationActual.submitted_at; }
    if (!this.newAuthorization.startdate) { this.newAuthorization.startdate = this.authorizationActual.startdate; }
    if (!this.newAuthorization.enddate) { this.newAuthorization.enddate = this.authorizationActual.enddate; }
    if (!this.newAuthorization.resumework) { this.newAuthorization.resumework = this.authorizationActual.resumework; }
    if (!this.newAuthorization.holidays) { this.newAuthorization.holidays = this.authorizationActual.holidays; }
    if (!this.newAuthorization.total_days) { this.newAuthorization.total_days = this.authorizationActual.total_days; }
    if (!this.newAuthorization.pendingdays) { this.newAuthorization.pendingdays = this.authorizationActual.pendingdays; }

    this.dialogRef.close(this.newAuthorization)
  }

  close(): void {
    this.dialogRef.close();
  }

  formatNumber(nr, n, str) {
    if (!nr) {
      nr = 0
    }
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
  }

  formatDate(value){
    return formatDateToLetter(value);
  }

  formatDateToOriginalDate(date: string) {
    let originalDate = dayjs(date).format('YYYY-MM-DD')
    let year = originalDate.split('-')[0]
    let month = originalDate.split('-')[1]
    let day = originalDate.split('-')[2]
    let newDate = `${year}-${month}-${day}`;

    return newDate;
  }
}
