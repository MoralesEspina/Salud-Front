import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, ThemePalette } from '@angular/material';
import { IEspeciality } from 'src/app/models/especiality.model';
import { Job } from 'src/app/models/job.model';
import { IPerson } from 'src/app/models/person.model';
import { IReubication } from 'src/app/models/reubication.model';
import { IWork } from 'src/app/models/work.model';
import { WorkService } from 'src/app/services/work.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personmodal',
  templateUrl: './personmodal.component.html',
  styleUrls: ['./personmodal.component.scss']
})
export class PersonmodalComponent implements OnInit {

  form: FormGroup;
  title: string;
  id: string
  component: string
  submitted: boolean = false
  color: ThemePalette = 'primary';
  checked = false;

  person: IPerson
  actualPerson: IPerson
  jobs: Job[] = []
  works: IWork[] = []
  especialities: IEspeciality[] = []

  formActionSubmmit: string; //create or Actualizar

  constructor(
    private workService: WorkService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonmodalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.actualPerson = data['person']
    this.person = data['person']
    this.formActionSubmmit = data.action
  }

  ngOnInit() {

    if (this.formActionSubmmit == 'Actualizar') {
      this.form = this.fb.group({
        fullname: [this.person.fullname, Validators.required],
        cui: [this.person.cui],
        partida: [this.person.partida, []],
        sueldo: [this.person.sueldo, []],
        admission_date: [this.person.admission_date],
        renglon: [this.person.renglon],

        uuid_job: [this.person.job.uuid_job],
        uuid_work: [this.person.work_dependency.uuid_work, Validators.required],
        uuid_especiality: [this.person.especiality.uuid_especiality],
        uuid_reubication: [this.person.reubication.uuid_reubication],

        job: [this.person.job, []],
        work_dependency: [this.person.work_dependency, []],
        especiality: [this.person.especiality, []],
        reubication: [this.person.reubication, []],

        phone: [this.person.phone, []],
        dpi: [this.person.dpi, []],
        nit: [this.person.nit, []],
        born_date: [this.person.born_date, []],
        email: [this.person.email, []],
        active: [this.person.active, []],
      });
    } else {
      this.form = this.fb.group({
        fullname: ['', Validators.required],
        cui: ['', Validators.required],
        partida: ['', Validators.required],
        sueldo: [Validators.required],
        admission_date: [],
        renglon: [],

        uuid_job: ['', Validators.required],
        uuid_work: ['', Validators.required],
        uuid_especiality: [],
        uuid_reubication: [],

        phone: [],
        dpi: [],
        nit: [],
        born_date: [],
        email: [],
      });
    }


    this.manyJobs();
    this.manyWorks();
    this.getEspecialities()
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
        this.person = this.form.value

        if (this.formActionSubmmit == 'Actualizar') {
          if (!this.form.value['uuid_job']) { this.person.job.uuid_job = null }
          if (!this.form.value['uuid_work']) { this.person.work_dependency.uuid_work = null }
          if (!this.form.value['uuid_especiality']) { this.person.especiality.uuid_especiality = null }
          if (!this.form.value['uuid_reubication']) { this.person.reubication.uuid_reubication = null }

          this.person.job.uuid_job = this.form.value['uuid_job'] || this.actualPerson.job.uuid_job
          this.person.work_dependency.uuid_work = this.form.value['uuid_work'] || this.actualPerson.work_dependency.uuid_work
          this.person.especiality.uuid_especiality = this.form.value['uuid_especiality'] || this.actualPerson.especiality.uuid_especiality
          this.person.reubication.uuid_reubication = this.form.value['uuid_reubication'] || this.actualPerson.reubication.uuid_reubication
        } else {
          let jobData = new Job()
          jobData.uuid_job = this.form.value['uuid_job']

          let workData = new IWork()
          workData.uuid_work = this.form.value['uuid_work']

          let esepecialityDate = new IEspeciality()
          esepecialityDate.uuid_especiality = this.form.value['uuid_especiality']

          let reubicationData = new IReubication()
          reubicationData.uuid_reubication = this.form.value['uuid_reubication']

          this.person.job = jobData;
          this.person.work_dependency = workData;
          this.person.especiality = esepecialityDate;
          this.person.reubication = reubicationData;
        }
        this.dialogRef.close(this.person);
      }
    })

  }

  close(): void {
    this.dialogRef.close();
  }

  manyJobs() {
    this.workService.getJobs()
      .subscribe(data => {
        this.jobs = data['data']
      })
  }

  manyWorks() {
    this.workService.getWorks()
      .subscribe(data => {
        this.works = data['data']
      })
  }

  getEspecialities() {
    this.workService.getEspecialities()
      .subscribe(data => {
        this.especialities = data['data']
      })
  }
}
