import { Claims } from 'src/app/models/claims.model';
import { RequestpermissionService } from './../../../services/request-permission.service';
import { PersonService } from './../../../services/person.service';
import { Component, ElementRef, OnInit, ViewChild, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IPerson } from 'src/app/models/person.model';
import { nameperson } from 'src/app/models/namepreson.model';
import { IPermission } from 'src/app/models/permission';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { ErrorsService } from 'src/app/services/errors.service';


@Component({
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionReqComponent implements OnInit {
  disableSelect = new FormControl(false);
  editing: boolean;
  public id_entrada;
  public _uuidPerson;
  public _uuidUser;
  public rol;
  statusPermission: boolean;
  statusPermission2: boolean;
  protected persons: nameperson[] = []
  private _persons: nameperson[] = []
  public permission: IPermission;
  public bossOneList;
  public bossTwoList;
  public statusRequest;

  public data_response;
  statusbossOne: boolean = false;
  statusbossTwo: boolean = false;
  deny: boolean = false;
  images: string[];

  addressFormPerson = this.fb.group({
    fullname: [null, Validators.required],
    renglon: [null, Validators.required],
    job: [null, Validators.required],
  })

  addressFormPermission = this.fb.group({
    permissionDate: [null, Validators.required],
    motive: [null, [Validators.required]],
    document: [null, [Validators.required]],
    bossOne: [null, Validators.required],
    bossTwo: [null, Validators.required],
    reason: [null],
  })


  constructor(
    private userService: UserService,
    private personService: PersonService,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private _permission: RequestpermissionService,
    private _sweetAlertService: SweetAlertService,
    private _errorService: ErrorsService,
    private _router: Router,
    private authServie: UserService,
  ) {
    this.images = [];


  }
  modelPerson: IPerson | undefined;

  @ViewChild('multiUserSearch', { static: false }) multiUserSearchInput: ElementRef;

  ngOnInit(): void {
    this.id_entrada = this.router.snapshot.params['id'];
    this.rol = this.authServie.userValue.rol;
    this._uuidUser = this.userService.userValue.uuid;
    if (!this.id_entrada) {
      this._uuidPerson = this.userService.userValue.uuidPerson;
      this.loadPerson(this._uuidPerson);
    }
    this.getBossTwo();
    this.getBossOne();
    this.loadPermission();
  }

  loadPerson(person) {
    this.personService.OnePerson(person).subscribe(
      data => {
        this.modelPerson = data['data'];
        this.addressFormPerson.setValue({
          'fullname': this.modelPerson.fullname,
          'renglon': this.modelPerson.renglon,
          'job': this.modelPerson.job.name,
        });
      }
    )
  }

  createNewPermission(addressFormPermission) {
    let id_entrada = this.userService.userValue.uuidPerson;
    const permission: IPermission = {
      submittedAt: "",
      permissionDate: addressFormPermission.value.permissionDate,
      motive: addressFormPermission.value.motive,
      uuidPerson: id_entrada,
      bossOne: addressFormPermission.value.bossOne,
      bossTwo: addressFormPermission.value.bossTwo,
      document: addressFormPermission.value.document,
      reason: "",
      statusBossOne: "",
      statusBossTwo: "",
      status: "",
    }
    if (!addressFormPermission.valid) {
      this._sweetAlertService.warning('Complete correctamente el formulario');
      return
    }
    this._permission.createRequestPermissionService(permission).subscribe(
      data => {
        this._sweetAlertService.createAndUpdate('Se Creo correctamente la solicitud');
        switch (this.rol) {
          case 'boss':
            this._router.navigate(['estadopermisos']);
            break;
          case 'boss2':
            this._router.navigate(['estadopermisos']);
            break;
          default:
            break;
        }

      }, error => {
        this._sweetAlertService.error('Se produjo un error al crear la solictud');
      }
    );
  }

  getBossOne() {
    this._permission.getBossOne().subscribe(
      response => {
        this.bossOneList = response['data'];
      }, error => {
      }
    )
  }

  getBossTwo() {
    this._permission.getBossTwo().subscribe(
      response => {
        this.bossTwoList = response['data'];
      }, error => {
      }
    )
  }

  loadPermission() {

    if (this.id_entrada) {
      this.editing = true
      this._permission.getOneRequestPermission(this.id_entrada).subscribe(
        data => {
          this.permission = data['data'];
          this.statusRequest = this.permission.status
          this.loadPerson(this.permission.uuidPerson);
          this.addressFormPermission.patchValue({
            'uuidPerson': this.permission.uuidPerson,
            'permissionDate': this.permission.permissionDate,
            'motive': this.permission.motive,
            'bossOne': this.permission.bossOne,
            'bossTwo': this.permission.bossTwo,
            'document': this.permission.document,
            'statusBossOne': '',
            'statusBossTwo': '',
            'status': '',
            'reason': this.permission.reason,
          }
          );
          if (this.permission.bossOne == this._uuidUser && this.permission.statusBossOne == 'En Espera' && this.permission.statusBossTwo == 'En Espera') {
            this.statusbossOne = true;
          } else if (this.permission.bossTwo == this._uuidUser && this.permission.statusBossOne == 'Aceptada' && this.permission.statusBossTwo == 'En Espera') {
            this.statusbossTwo = true;
          }
          if (this.permission.status === 'Denegada') {
            this.deny = true;
          }
        })
    } else { this.editing = false }

  }


  async denyRequest() {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Indique el motivo del rechazo:',
      inputPlaceholder: 'Escribe acá el motivo...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })

    if (!text) {
      this._sweetAlertService.warning('Debe ingresar un motivo');
      return
    }
    const deny: IPermission = {
      'submittedAt': '',
      'uuidPerson': '',
      'permissionDate': '',
      'motive': '',
      'bossOne': '',
      'bossTwo': '',
      'document': '',
      'statusBossOne': 'Denegada',
      'statusBossTwo': '',
      'status': '',
      'reason': text,
    }
    this._permission.updateOneRequestPermission(deny, this.id_entrada).subscribe(
      response => {
        this._sweetAlertService.createAndUpdate('Se denego correctamente la solicitud');
        this._router.navigate(['/permisos'])
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      }, error => {
        console.log(error)
        this._sweetAlertService.warning('No se pudo denegar la solicitud');
        this.data_response = error;
        this._errorService.error(this.data_response);
      }
    );
  }

  async denyRequestVoBo() {

    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Indique el motivo del rechazo:',
      inputPlaceholder: 'Escribe acá el motivo...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })

    if (!text) {
      this._sweetAlertService.warning('Debe ingresar un motivo');
      return
    }
    const deny: IPermission = {
      'submittedAt': '',
      'uuidPerson': '',
      'permissionDate': '',
      'motive': '',
      'bossOne': '',
      'bossTwo': '',
      'document': '',
      'statusBossOne': this.permission.statusBossOne,
      'statusBossTwo': 'Denegada',
      'status': '',
      'reason': text,
    }
    this._permission.updateOneRequestPermission(deny, this.id_entrada).subscribe(
      response => {
        this._sweetAlertService.createAndUpdate('Se denego correctamente la solicitud');
        this._router.navigate(['/permisos'])
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      }, error => {
        console.log(error)
        this._sweetAlertService.warning('No se pudo denegar la solicitud');
        this.data_response = error;
        this._errorService.error(this.data_response);
      }
    );
  }

  acceptRequest(addressFormPermission) {
    const accepted: IPermission = {
      'submittedAt': '',
      'uuidPerson': '',
      'permissionDate': '',
      'motive': '',
      'bossOne': '',
      'bossTwo': '',
      'document': '',
      'statusBossOne': 'Aceptada',
      'statusBossTwo': '',
      'status': '',
      'reason': '',
    }
    if (addressFormPermission.valid) {
      this._permission.updateOneRequestPermission(accepted, this.id_entrada).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se acepto correctamente la solicitud');
          this._router.navigate(['/permisos'])
        }, error => {
          console.log(error)
          this.data_response = error;
          this._errorService.error(this.data_response);
        }
      );
    } else {
      this._sweetAlertService.warning('Complete correctamente el formulario');
    }
  }

  acceptRequestVoBo(addressFormPermission) {
    const accepted: IPermission = {
      'submittedAt': '',
      'uuidPerson': '',
      'permissionDate': '',
      'motive': '',
      'bossOne': '',
      'bossTwo': '',
      'document': '',
      'statusBossOne': this.permission.statusBossOne,
      'statusBossTwo': 'Aceptada',
      'status': '',
      'reason': '',
    }
    if (addressFormPermission.valid) {
      this._permission.updateOneRequestPermission(accepted, this.id_entrada).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se acepto correctamente la solicitud');
          this._router.navigate(['/permisos'])
        }, error => {
          console.log(error)
          this.data_response = error;
          this._errorService.error(this.data_response);
        }
      );
    } else {
      this._sweetAlertService.warning('Complete correctamente el formulario');
    }
  }
}
