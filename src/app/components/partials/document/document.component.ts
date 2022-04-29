import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IAuthorization } from 'src/app/models/authorization';
import { IPerson } from 'src/app/models/person.model';
import { IWork } from 'src/app/models/work.model';
import { WorkService } from 'src/app/services/work.service';
import FormatDateToLetter from '../../../utils/formats/formatDateToLetter';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {


  actuality = `Jalapa, ${this.formatDate(new Date())}`

  form: FormGroup;
  submitted: boolean = false
  person: IPerson
  authorizationFormEmmited = new IAuthorization();
  authorizationOfVacations = new IAuthorization();

  bodytext: string = `En respuesta a su solicitud de vacaciones, me dirijo a usted para hacer de su conocimiento que de conformidad a lo que establece el artículo 61 numeral 2, del Decreto 1748. “Ley de Servicio Civil”, Artículo 51 del Acuerdo Gubernativo 18-98 “Reglamento de la citada Ley” se le autorizan vacaciones después de un año de servicios continuos de labores, durante las fechas que a continuación se detallan:`

  years: string[] = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']
  works: IWork[] = []


  constructor(private fb: FormBuilder,
    private workService: WorkService,
    private dialogRef: MatDialogRef<DocumentComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.person = data['person']
  }

  ngOnInit() {

    this.form = this.fb.group({
      submitted_at: [this.authorizationOfVacations.submitted_at, []],
      startdate: [this.authorizationOfVacations.startdate, Validators.required],
      enddate: [this.authorizationOfVacations.enddate, Validators.required],
      resumework: [this.authorizationOfVacations.resumework, Validators.required],
      holidays: ['', Validators.required],
      total_days: [this.authorizationOfVacations.total_days, Validators.required],
      pendingdays: [this.authorizationOfVacations.pendingdays, Validators.required],
      observation: [this.authorizationOfVacations.observation],
      authorizationyear: [this.authorizationOfVacations.authorizationyear, Validators.required],
      body: [this.bodytext, []],
      personnelOfficer: [this.authorizationOfVacations.personnelOfficer = "Licda. Andrea Raquel Pinto López ", Validators.required],
      personnelOfficerPosition: [this.authorizationOfVacations.personnelOfficerPosition = 'Jefe de Personal', Validators.required],
      personnelOfficerArea: [this.authorizationOfVacations.personnelOfficerArea = 'Área de Salud de Jalapa', Validators.required],
      executiveDirector: [this.authorizationOfVacations.executiveDirector = 'Vo. Bo. Dr. José Rafael Campos Polanco', Validators.required],
      executiveDirectorPosition: [this.authorizationOfVacations.executiveDirectorPosition = 'Director Ejecutivo', Validators.required],
      executiveDirectorArea: [this.authorizationOfVacations.executiveDirectorArea = 'Área de Salud de Jalapa', Validators.required],
    })

    this.getWorks()
  }

  get f() { return this.form.controls }

  save() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }

    this.authorizationOfVacations = this.form.value
    this.authorizationFormEmmited = this.authorizationOfVacations
    this.authorizationFormEmmited.person = this.person;
    if (!this.authorizationFormEmmited.submitted_at) { this.authorizationFormEmmited.submitted_at = `${new Date()}` }
    this.dialogRef.close(this.authorizationFormEmmited)
  }

  close(): void {
    this.dialogRef.close();
  }

  getWorks() {
    this.workService.getWorks()
      .subscribe(data => {
        this.works = data['data']
      })
  }

  emmittedDay(e) {
    this.actuality = FormatDateToLetter(e)
  }

  formatDate(e): string {
    var emitteddate = new Date(e)
    var emitday = emitteddate.getDate()
    var emitmonth = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date(emitteddate));
    var emitanio = emitteddate.getFullYear()
    return `${emitday} de ${emitmonth} ${emitanio}.`
  }
}
