import { Employees, Admins } from './../../models/user.model';
import { filteruser } from './../../models/namepreson.model';
import { IUser } from './../../models/edituser.model';
import { nameperson } from 'src/app/models/namepreson.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from 'src/app/models/rols.model';
import { Bosses, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { PersonService } from 'src/app/services/person.service';
import { UsermodalComponent } from '../partials/usermodal/usermodal.component';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { LocalService } from 'src/app/services/local.service';
import { CurriculumDataI } from 'src/app/models/curriculum.model';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  filterTerm: string;
  public p: number = 1;
  public p2: number = 1;
  public p3: number = 1;
  public tableSize: number = 10;


  search = this.localService.getJsonValue('filter');
  limit: any = this.localService.getJsonValue('limit');
  form: FormGroup;
  title: string
  user = new User()
  curriculum = new CurriculumDataI()
  usuario: IUser[] = []
  users: User[] = []
  admins: Admins[] = []
  bosses: Bosses[] = []
  employees: Employees[] = []
  submitted: boolean = false;
  error: string = '';
  rols: Rol[] = []
  person = new nameperson()
  protected persons: nameperson[] = []
  private _persons: nameperson[] = []


  rolTranslations = {
    'admin': 'Administrador',
    'member': 'Miembro',
    'boss': 'Jefe Inmediato',
    'boss2': 'Jefe Vo.Bo',
    'employed': 'Empleado',
  };


  getRolTranslation(rol: string): string {
    return this.rolTranslations[rol] || rol;
  }

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private personService: PersonService,
    private fb: FormBuilder,
    private localService: LocalService,
    private _sweetAlertService: SweetAlertService,
  ) {
    this.localService.getJsonValue('limit');
  }

  @ViewChild('multiUserSearch', { static: false }) multiUserSearchInput: ElementRef;

  ngOnInit() {
    this.getrols()
    this.afterChanges()
    this.form = this.fb.group({
      uuidPerson: [''],
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
    this.curriculum.uuidPerson = this.user.uuidPerson
    this.userService.crearUsuario(this.user)
      .subscribe(data => {
        this._sweetAlertService.createAndUpdate('Usuario creado correctamente');
        this.userService.crearCurriculum(this.curriculum)
          .subscribe(
            res => {
              this.curriculum = res[0];
            },
            err => console.log(err)
          )
          setTimeout(function(){
            window.location.reload()
          }, 700);
      }, (err) => {
        if (err == 'User already exists') {
          this._sweetAlertService.error('Este usuario ya existe');
        } else {
          this._sweetAlertService.error('No se pudo crear el usuario');
        }
      });
  }

  afterChanges() {
    this.getUsers1()
    this.getUsers2()
    this.getUsers3()
    this.GetNamePerson()
  }

  getrols() {
    this.userService.rols()
      .subscribe(data => {
        this.rols = data['data']
      }, err => console.log(err))}

  getUsers1(filter?: string) {

    if (filter && typeof filter == 'string' && typeof filter != 'object' || filter == '') {
      this.localService.setJsonValue('filter', filter)
    }

    var stFilter = this.localService.getJsonValue('filter')
    this.userService.users1()
      .subscribe(data => {
        this.admins = data['data']
      }, err => console.log(err))}

  getUsers2() {
    this.userService.users2()
      .subscribe(data => {
        this.employees = data['data']

      }, err => console.log(err)) }

  getUsers3() {
    this.userService.users3()
      .subscribe(data => {
        this.bosses = data['data']
      }, err => console.log(err))}

  GetNamePerson() {
    this.personService.GetNamePersonForUser()
      .subscribe(data => {
        this.persons = data['data']
        this._persons = data['data']
      }, err => console.log(err))}

  onInputChange() {
    const searchInput = this.multiUserSearchInput.nativeElement.value ?
      this.multiUserSearchInput.nativeElement.value.toLowerCase() : '';
      this.persons = this._persons.filter(u => {
        const name: string = u.fullname.replace(/\s/g, '').toLowerCase();
        return name.indexOf(searchInput.replace(/\s/g, '').toLowerCase()) > -1;
    });
  }

  UpdateUser(uuid) {
    this.userService.OneUser(uuid)
      .subscribe(data => {
        const modalDialog = this.dialog.open(UsermodalComponent, {
          disableClose: true,
          autoFocus: true,
          width: '600px',
          data: {
            user: data['data'],
            action: 'Actualizar' }
        })
        modalDialog.afterClosed()
          .subscribe(result => {
            if (result) {
              this.userService.UpdateUser(result, uuid)
                .subscribe(ok => {
                  this.afterChanges()
                  this._sweetAlertService.createAndUpdate('Registro actualizado con éxito');
                }, err => console.log(err)
                )}
          })
      })
  }

  deletePerson(id: string, idPerson: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Borrar el Usuario!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#4299e1',
      confirmButtonColor: '#f56565',
      cancelButtonText: "Cancelar",
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(data => {
          this._sweetAlertService.deleteOneConfirmation('Registro eliminado con éxito');
          this.afterChanges()
          this.userService.deleteCurriculum(idPerson).subscribe(data => {
          })
        }, error => {
          this._sweetAlertService.deleteOneError('No se ha podido eliminar el registro', error);
        });
      }
    })
  }

  deleteAdmin(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Borrar el Usuario!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#4299e1',
      confirmButtonColor: '#f56565',
      cancelButtonText: "Cancelar",
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(data => {
          this._sweetAlertService.deleteOneConfirmation('Registro eliminado con éxito');
          this.afterChanges();
        }, error => {
          this._sweetAlertService.deleteOneError('No se ha podido eliminar el registro', error);
        });
      }
    })
  }


}
