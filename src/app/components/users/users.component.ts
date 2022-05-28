import { IUser } from './../../models/edituser.model';
import { nameperson } from 'src/app/models/namepreson.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Rol } from 'src/app/models/rols.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { PersonService } from 'src/app/services/person.service';
import { UsermodalComponent } from '../partials/usermodal/usermodal.component';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { LocalService } from 'src/app/services/local.service';
import { CurriculumDataI } from 'src/app/models/curriculum.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  search = this.localService.getJsonValue('filter');
  limit: any = this.localService.getJsonValue('limit');
  form: FormGroup;
  title: string
  user = new User()
  curriculum= new CurriculumDataI()
  usuario: IUser[] = []
  users: User[] = []
  _users= new MatTableDataSource(this.usuario)
  submitted: boolean = false;
  error: string = '';
  rols: Rol[] = []
  person = new nameperson()
  protected persons: nameperson[] = []
  private _persons: nameperson[] = []
  page: number = 1


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._users.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private personService: PersonService,
    private fb: FormBuilder,
    private localService: LocalService,
  ) {
    this.localService.getJsonValue('limit');
    this.ManyPersons();
  }

  @ViewChild('multiUserSearch',{static: false}) multiUserSearchInput: ElementRef;

  ngOnInit() {
    this.getrols()
    this.getUsers()
    this.GetNamePerson()
    this.form = this.fb.group({
      uuidPerson: ['', Validators.required],
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      id_rol: [this.user.id_rol, Validators.required]
    })

  }

  ManyPersons(page?: number, limit?: string, filter?: string) {

    if (limit && typeof limit == 'string') {
      this.localService.setJsonValue('limit', limit)
    }

    if (filter && typeof filter == 'string' && typeof filter != 'object' || filter == '') {
      this.localService.setJsonValue('filter', filter)
    }

    var stlimit = this.localService.getJsonValue('limit')
    var stFilter = this.localService.getJsonValue('filter')

    this.userService.ManyPersons(page, stlimit, stFilter)
      .subscribe(res => {
        this.users = res['data']
      })
  }
  increment() {
    this.page++
    this.ManyPersons(this.page)
  }

  decrement() {
    if (this.page <= 0) {
      this.page = 1
    } else {
      this.page--
    }
    this.ManyPersons(this.page)
  }

  get f() { return this.form.controls }

  save() {
    this.submitted = true
    if (this.form.invalid) { return }
    this.user = this.form.value
    this.user.id_rol = parseInt(`${this.user.id_rol}`)

    this.curriculum.uuidPerson= this.user.uuidPerson

    this.userService.crearUsuario(this.user)
      .subscribe(data => {
        this.getUsers()
        this.GetNamePerson()

        this.form.reset()
        Swal.fire({
          icon: 'success',
          title: '<span style="color: white; "> Usuario creado correctamente </span>',
          toast: true,
          showConfirmButton: false,
          position: 'top-end',
          timer: 1500,
          timerProgressBar: true,
          background: '#68d391',
        })

      }, (err) => {
        if (err == 'User already exists') {
          Swal.fire({
            icon: 'error',
            title: 'Este usuario ya existe!',
            timer: 2000,
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Fallo al crear el usuario',
            timer: 2000,
          })
        }
      });

    this.userService.crearCurriculum(this.curriculum)
    .subscribe(
      res => {
        this.curriculum = res[0];
        console.log(res[0]);
      },
      err => console.log(err)
    )

  }

  getrols() {
    this.userService.rols()
      .subscribe(data => {
        this.rols = data['data']
      }, err => console.log(err))
  }

  getUsers() {
    this.userService.users()
      .subscribe(data => {
        this.users = data['data']
      }, err => console.log(err))
  }


  GetNamePerson() {
    this.personService.GetNamePerson()
    .subscribe(data => {
      this.persons = data['data']
      this._persons = data['data']

    }, err => console.log(err))
  }

  onInputChange(){
    console.log(this.multiUserSearchInput.nativeElement.value);
    const searchInput = this.multiUserSearchInput.nativeElement.value ?
    this.multiUserSearchInput.nativeElement.value.toLowerCase() : '';
    this.persons = this._persons.filter(u => {
      const name: string = u.fullname.toLowerCase();
      return name.indexOf(searchInput) > -1;
    });
  }
  UpdateUser(uuid) {
    console.log(uuid);
    this.userService.OneUser(uuid)
      .subscribe(data => {
        const modalDialog = this.dialog.open(UsermodalComponent, {
          disableClose: true,
          autoFocus: true,
          width: '600px',
          data: {
            user: data['data'],
            action: 'Actualizar'

          }
        }
        )

        modalDialog.afterClosed()
          .subscribe(result => {

            if (result) {
              this.userService.UpdateUser(result, uuid)
                .subscribe(ok => {
                  this.ManyPersons()
                }, err => console.log(err))
                setTimeout(location.reload.bind(location),200);
            }
          }

          )

      }

      )

  }
  deletePerson(id: string) {
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
        Swal.fire({
          icon: 'success',
          title: `<span class="text-gray-900"> Usuario borrado exitosamente </span>`,
          toast: true,
          showConfirmButton: false,
          position: 'top-end',
          timer: 2000,
          background: '#ffffff',
        })
      }
    })
  }


}
