import { AfterViewInit, Component, Directive, Inject, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSelect, MAT_DIALOG_DATA, ThemePalette } from '@angular/material';
import * as dayjs from 'dayjs';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import pdfFonts from 'src/app/fonts/custom/times-new-roman';
import { IPerson } from 'src/app/models/person.model';
import { RequestVacation } from 'src/app/models/requestVacation.models';
import { PersonService } from 'src/app/services/person.service';
import Swal from 'sweetalert2';
import { PersonmodalComponent } from '../../partials/personmodal/personmodal.component';


@Component({
  selector: 'app-permissionrequest',
  templateUrl: './permissionrequest.component.html',
  styleUrls: ['./permissionrequest.component.scss']
})
export class PermissionrequestComponent implements OnInit, AfterViewInit, OnDestroy  {


  years: string[] = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']

  form: FormGroup;
  color: ThemePalette = 'primary';
  checked = false;
  disabled: boolean;
  submitted = false
  vacationRequest = new RequestVacation();
  person = new IPerson();
  lastVacationPeriodo: string = '----';
  requestVacationPeriodo: string = '----';
  rangeDateErrorForLastVacation: boolean;
  rangeDateErrorForRequestVacation: boolean;
  protected substitutes: IPerson[] = [];
  formAction: string; // Edit or Create
  dynamicJSONForm: Object;
  public subtituteFilterCtrl: FormControl = new FormControl();
  public person_server: FormControl = new FormControl([Validators.required]);
  public filteredSubstitutes: ReplaySubject<IPerson[]> = new ReplaySubject<IPerson[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private dialogRef: MatDialogRef<PersonmodalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.formAction = data.action
    if (this.formAction === 'Crear') {
      this.person = JSON.parse(JSON.stringify(data.person));
      this.disabled = true;
      this.dynamicJSONForm = {
        last_year_vacation: ['', Validators.required],
        vacation_year_request: ['', Validators.required],
        last_vacation_from: ['', Validators.required],
        last_vacation_to: ['', Validators.required],
        vacation_from_date: ['', Validators.required],
        vacation_to_date: ['', Validators.required],
        has_vacation_day: [],
        days_quantity: [{ value: '', disabled: true }],
        // person_server: ['', Validators.required],
        observations: [],
      }
    } else {
      this.vacationRequest = data.requestVacation;
      this.person = JSON.parse(JSON.stringify(this.vacationRequest.person));

      this.disabled = this.vacationRequest.has_vacation_day ? false : true
      this.dynamicJSONForm = {
        last_year_vacation: [this.vacationRequest.last_year_vacation, Validators.required],
        vacation_year_request: [this.vacationRequest.vacation_year_request, Validators.required],
        last_vacation_from: [this.vacationRequest.last_vacation_from, Validators.required],
        last_vacation_to: [this.vacationRequest.last_vacation_to, Validators.required],
        vacation_from_date: [this.vacationRequest.vacation_from_date, Validators.required],
        vacation_to_date: [this.vacationRequest.vacation_to_date, Validators.required],
        has_vacation_day: [this.vacationRequest.has_vacation_day],
        days_quantity: [{ value: this.vacationRequest.days_quantity, disabled: !this.vacationRequest.has_vacation_day }],
        // person_server: [this.vacationRequest.person_server.uuid, Validators.required],
        observations: [this.vacationRequest.observations],
      }
    }

    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.form = this.fb.group(this.dynamicJSONForm)
    this.GetSubstitutes();

    this.person_server.setValue(this.substitutes);
    this.filteredSubstitutes.next(this.substitutes.slice())
    this.subtituteFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(val => {
        this.filterSubstitutes();
      })

    this.form.get('has_vacation_day').valueChanges.subscribe(val => {
      this.disabled = !this.disabled

      if (this.disabled) {
        this.form.controls['days_quantity'].setValue('');
        this.form.get('days_quantity').disable()
      } else {
        this.form.get('days_quantity').enable()
      }
    })

    this.form.get('vacation_from_date').valueChanges.subscribe(vacationDateFrom => {
      this.requestVacationPeriodo = vacationDateFrom.split('-')[0]
      this.rangeDateErrorForRequestVacation = dayjs(vacationDateFrom) > dayjs(this.form.get('vacation_to_date').value) ? true : false
    })

    this.form.get('vacation_to_date').valueChanges.subscribe(vacationDateTo => {
      this.rangeDateErrorForRequestVacation = dayjs(this.form.get('vacation_from_date').value) > dayjs(vacationDateTo) ? true : false
    })

    this.form.get('last_vacation_from').valueChanges.subscribe(lastVacationDateFrom => {
      this.lastVacationPeriodo = lastVacationDateFrom.split('-')[0]
      this.rangeDateErrorForLastVacation = dayjs(lastVacationDateFrom) > dayjs(this.form.get('last_vacation_to').value) ? true : false
    })

    this.form.get('last_vacation_to').valueChanges.subscribe(lastVacationDateTo => {
      this.rangeDateErrorForLastVacation = dayjs(this.form.get('last_vacation_from').value) > dayjs(lastVacationDateTo) ? true : false
    })

    // if (this.formAction != 'Crear') {
    //   this.setInitialValue();
    // }
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  get f() { return this.form.controls }

  save() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }

    this.vacationRequest = this.form.value
    this.vacationRequest.person_server = new IPerson()
    this.vacationRequest.person_server.uuid = this.person_server.value || null
    this.vacationRequest.person = this.person
    this.dialogRef.close({ data: this.vacationRequest, action: this.formAction })
  }

  close(): void {
    this.dialogRef.close();
  }

  async CreateSubstitute() {
    const { value: formValues } = await Swal.fire({
      title: '<h1 class="text-sm">AGREGAR</h1>',
      html: '<input id="fullname" class="input-gray focus:outline-none focus:border-blue-400 my-2 h-12 uppercase " placeholder="Nombre completo" type="text">',
      focusConfirm: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      preConfirm: () => {
        return [
          {
            fullname: document.getElementById('fullname')['value']
          }
        ]
      }
    })

    if (formValues) {
      if (!formValues[0].fullname) {
        Swal.fire({
          icon: 'warning',
          title: 'Ningún dato ingresado',
          toast: true,
          showConfirmButton: false,
          position: 'top-end',
          timer: 2000,
          background: '#ffffff',
        })
      } else {
        this.personService.CreateSubstitute(formValues[0].fullname)
          .subscribe(data => {
            Swal.fire({
              icon: 'success',
              title: data['message'],
              toast: true,
              showConfirmButton: false,
              position: 'top-end',
              timer: 2000,
              background: '#ffffff',
            })
            this.GetSubstitutes();
          })
      }
    }
  }

  GetSubstitutes() {
    this.personService.GetSubstitutes()
      .subscribe(data => {
        this.substitutes = data['data']
      })
  }

  protected filterSubstitutes() {
    if (!this.substitutes) { return; }
    let search = this.subtituteFilterCtrl.value;
    if (!search) {
      this.filteredSubstitutes.next(this.substitutes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredSubstitutes.next(
      this.substitutes.filter(substitute => substitute.fullname.toLowerCase().indexOf(search) > -1)
    );
  }

  protected setInitialValue() {
    this.person_server.setValue(this.vacationRequest.person_server.uuid)
  }


}



@Directive({
  selector: '[opDisabled]'
})
export class DisabledDirective implements OnChanges {
  @Input() opDisabled: boolean;

  constructor(private ngControl: NgControl) { }

  ngOnChanges() {
    if (this.opDisabled) {
      this.ngControl.control.disable();
    } else {
      this.ngControl.control.enable();
    }

  }
}
