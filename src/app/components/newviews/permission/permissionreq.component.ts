import { RequestpermissionService } from './../../../services/request-permission.service';
import { PersonService } from './../../../services/person.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IPerson } from 'src/app/models/person.model';
import { nameperson } from 'src/app/models/namepreson.model';
import { IPermission } from 'src/app/models/permission';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionReqComponent implements OnInit {
  disableSelect = new FormControl(false);
  editing: boolean;
  public id_entrada;
  public status1: boolean = false;
  protected persons: nameperson[] = []
  private _persons: nameperson[] = []
  public permission: IPermission;
  public bossOneList;
  public bossTwoList;
  private _router: Router;
  public data_response;

  addressFormPerson = this.fb.group({
    fullname: [null, Validators.required],
    renglon: [null, Validators.required],
    job: [null, Validators.required],

  })
  addressFormPermission = this.fb.group({
    permissionDate: [null, Validators.required],
    motive: [null, Validators.required],
    uuidPerson: [null, Validators.required],
    bossOne: [null, Validators.required],
    bossTwo: [null, Validators.required],
    reason: [null, Validators.required],
    statusBossOne: [null, Validators.required],
    statusBossTwo: [null, Validators.required],
    status: [null, Validators.required],

  })

  constructor(
    private userService: UserService,
    private personService: PersonService,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private _permission: RequestpermissionService,
  ) {


  }
  modelPerson: IPerson | undefined;
  uuid: string = this.userService.userValue.uuidPerson;

  @ViewChild('multiUserSearch', { static: false }) multiUserSearchInput: ElementRef;

  ngOnInit(): void {
    this.id_entrada = this.router.snapshot.params['id'];

    this.loadPerson();
    this.getBossTwo();
    this.getBossOne();
    this.loadPermission();
  }

  loadPerson() {
    this.id_entrada = this.userService.userValue.uuidPerson;
    if (!this.id_entrada) {
      this.personService.OnePerson(this.id_entrada).subscribe(
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
  }

  onInputChange() {
    const searchInput = this.multiUserSearchInput.nativeElement.value ?
      this.multiUserSearchInput.nativeElement.value.toLowerCase() : '';
    this.persons = this._persons.filter(u => {
      const name: string = u.fullname.toLowerCase();
      return name.indexOf(searchInput) > -1;
    });
  }


  createNewPermission() {
    let id_entrada = this.userService.userValue.uuidPerson;
    const permission: IPermission = {
      permissionDate: this.addressFormPermission.value.permissionDate,
      motive: this.addressFormPermission.value.motive,
      uuidPerson: id_entrada,
      bossOne: this.addressFormPermission.value.bossOne,
      bossTwo: this.addressFormPermission.value.bossTwo,
      reason: "",
      statusBossOne: "",
      statusBossTwo: "",
      status: "",

    }
    this._permission.createRequestPermissionService(permission).subscribe(
      data => { }
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
    this.id_entrada = this.router.snapshot.params['id'];
    if (this.id_entrada) {
      this.editing = true
      this._permission.getOneRequestPermission(this.id_entrada).subscribe(
        data => {
          this.permission = data['data'];
          console.log(this.permission);
          this.addressFormPermission.setValue({
            'uuidPerson': this.permission.uuidPerson,
            'permissionDate': this.permission.permissionDate,
            'motive': this.permission.motive,
            'bossOne': this.permission.bossOne,
            'bossTwo': this.permission.bossTwo,
            'reason': this.permission.reason,

          });
        }
      )
    }else{this.editing = false}
  }


}
