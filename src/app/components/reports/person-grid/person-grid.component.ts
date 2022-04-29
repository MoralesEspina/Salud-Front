import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, ThemePalette } from '@angular/material';
import { Claims } from 'src/app/models/claims.model';
import { IPerson } from 'src/app/models/person.model';
import { LocalService } from 'src/app/services/local.service';
import { PersonService } from 'src/app/services/person.service';
import { UserService } from 'src/app/services/user.service';
import { ReportGridPersons } from 'src/app/utils/reports/reportAllPersons';
import Swal from 'sweetalert2';
import { PersonmodalComponent } from '../../partials/personmodal/personmodal.component';
declare const createObjectPDFReport: any;

@Component({
  selector: 'app-person-grid',
  templateUrl: './person-grid.component.html',
  styleUrls: ['./person-grid.component.scss']
})
export class PersonGridComponent implements OnInit {

  search = this.localService.getJsonValue('FirstFilter');
  limit: any = this.localService.getJsonValue('FirstLimit');
  countBook = '';
  page: number = 1
  user: Claims = new Claims()
  persons: IPerson[] = []
  dataTablePersons: IPerson[] = [];
  data: string;
  checkedAll: boolean;
  color: ThemePalette = 'primary';

  /**
   * Objeto de columnas a incluir
   */

  checkfullname: boolean = false;
  checkcui: boolean = false;
  checkjob: boolean = false;
  checkespeciality: boolean = false;
  checkpartida: boolean = false;
  checkadmission_date: boolean = false;
  checkreubication: boolean = false;
  checkwork_dependency: boolean = false;
  checkrenglon: boolean = false;
  checkphone: boolean = false;
  checkdpi: boolean = false;
  checknit: boolean = false;
  checkborn_date: boolean = false;
  checkemail: boolean = false;
  checkactive: boolean = false;

  orderBy = {
    ascfullname: true,
    asccui: false,
    ascjob: false,
    ascespeciality: false,
    ascpartida: false,
    ascadmission_date: false,
    ascreubication: false,
    ascwork_dependency: false,
    ascrenglon: false,
    ascphone: false,
    ascdpi: false,
    ascnit: false,
    ascborn_date: false,
    ascemail: false,
    ascactive: false,
  }

  orderByObserver$ = new EventEmitter<Object>();

  constructor(private userService: UserService,
    private personService: PersonService,
    private dialog: MatDialog,
    private localService: LocalService) { }

  ngOnInit() {
    this.user.rol = this.userService.userValue.rol;
    this.ManyPersons();

    this.orderByObserver$.subscribe((val) => {
      this.orderReport(val.orderAsc, val.column, this.persons);
      this.orderReport(val.orderAsc, val.column, this.dataTablePersons);
    })
  }


  ManyPersons(page?: number, limit?: string, filter?: string) {
    this.orderBy.ascactive = true
    if (limit && typeof limit == 'string') {
      this.localService.setJsonValue('FirstLimit', limit)
    }

    if (filter && typeof filter == 'string' && typeof filter != 'object' || filter == '') {
      this.localService.setJsonValue('FirstFilter', filter)
    }

    var stlimit = this.localService.getJsonValue('FirstLimit')
    var stFilter = this.localService.getJsonValue('FirstFilter')

    this.personService.ManyPersonsWithFullData(page, stlimit, stFilter)
      .subscribe(res => {
        this.persons = this.modifyData(res['data'])
      })
  }

  modifyData(persons): any {
    persons.forEach(element => {
      if (!element.reubication.name) {
        element.reubication.name = element.work_dependency.name
      }

      if (!element.especiality.name) {
        element.especiality.name = 'NINGUNA'
      }

      if (!element.job.name) {
        element.job.name = 'NINGUNO'
      }

      if (!element.especiality.name) {
        element.especiality.name = 'NINGUNA'
      }

      if (!element.work_dependency.name) {
        element.work_dependency.name = 'NINGUNA'
      }

      if (element.active) {
        element.activo = 'SI'
      } else {
        element.activo = 'NO'
      }

      if (!element.admission_date) {
        element.admission_date = '0000-00-00'
      }

      if (!element.phone) {
        element.phone = 'NO INGRESADO'
      }

      if (!element.dpi) {
        element.dpi = 'NO INGRESADO'
      }

      if (!element.nit) {
        element.nit = 'NO INGRESADO'
      }

      if (!element.born_date) {
        element.born_date = '0000-00-00'
      }

      if (!element.email) {
        element.email = 'NO INGRESADO'
      }
    });

    return persons;
  }
  async PrintReport() {
    let columnsToInclude = [
      {
        check: false,
        column: 'uuid',
      },
      {
        check: true,
        column: 'No.',
      },
      {
        check: this.checkfullname,
        column: 'NOMBRE',
      },
      {
        check: this.checkcui,
        column: 'CÓDIGO',
      },
      {
        check: this.checkjob,
        column: 'PUESTO',
      },
      {
        check: this.checkespeciality,
        column: 'ESPECIALIDAD',
      },
      {
        check: this.checkpartida,
        column: 'PARTIDA',
      },
      {
        check: this.checkadmission_date,
        column: 'FECHA DE INGRESO',
      },
      {
        check: this.checkreubication,
        column: 'REUBICACIÓN',
      },
      {
        check: this.checkwork_dependency,
        column: 'DEPENDENCIA',
      },
      {
        check: this.checkrenglon,
        column: 'RENGLÓN',
      },
      {
        check: this.checkphone,
        column: 'TELÉFONO',
      },
      {
        check: this.checkdpi,
        column: 'DPI',
      },
      {
        check: this.checknit,
        column: 'NIT',
      },
      {
        check: this.checkborn_date,
        column: 'FECHA DE NACIMIENTO',
      },
      {
        check: this.checkemail,
        column: 'CORREO',
      },
      {
        check: this.checkactive,
        column: 'ACTIVO',
      },
    ]

    if (this.dataTablePersons.length ==0) {
      Swal.fire({
        icon: 'warning',
        text: 'No hay ningun registro a imprimir',
        timer: 2000
      });
      return;
    }
    
    let columnsCheckCount = 0;
    columnsToInclude.forEach(element => {
      if (element.check == true) {
        columnsCheckCount++
      }
    });

    if (columnsCheckCount < 2) {
      Swal.fire({
        icon: 'warning',
        text: 'No ha elegido ninguna columna para imprimir',
        timer: 2000
      });
      return;
    }


    let table = await createObjectPDFReport(columnsToInclude, JSON.stringify(JSON.stringify(this.dataTablePersons)))
    ReportGridPersons(table).then(
      pdf => {
        pdf.create().print()
      }
    )

  }




  UpdatePerson(uuid) {
    this.personService.OnePerson(uuid)
      .subscribe(data => {
        const modalDialog = this.dialog.open(PersonmodalComponent, {
          disableClose: true,
          autoFocus: true,
          width: '600px',
          data: {
            person: data['data'],
            action: 'Actualizar'
          }
        })

        modalDialog.afterClosed()
          .subscribe(result => {

            if (result) {
              this.personService.UpdatePerson(result, uuid)
                .subscribe(ok => {
                  this.ManyPersons()
                }, err => console.log(err))
            }
          })
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



  addToPrintData(person: IPerson) {
    if (!this.dataTablePersons.includes(person)) {
      this.dataTablePersons.push(person)
    } else {
      for (let index = 0; index < this.dataTablePersons.length; index++) {
        const element = this.dataTablePersons[index];
        if (element.uuid === person.uuid) {
          this.dataTablePersons.splice(index, 1);
          break;
        }
      }
    }
  }

  addAllToPrintData() {
    debugger

    if (this.checkedAll) {
      this.persons.forEach(element => {
        element.isSelected = true;
        this.dataTablePersons.push(element)
      })


    } else {
      this.persons.forEach(element => {
        element.isSelected = false;
      })

      this.dataTablePersons = [];
    }
  }


  orderReport(asc, column, arrayDataTable) {
    if (column == 'job') {
      if (asc) {
        arrayDataTable.sort((a, b) => a.job.name.localeCompare(b.job.name))
      } else {
        arrayDataTable.sort((a, b) => b.job.name.localeCompare(a.job.name))
      }
      return;
    }

    if (column == 'work_dependency') {
      if (asc) {
        arrayDataTable.sort((a, b) => a.work_dependency.name.localeCompare(b.work_dependency.name))
      } else {
        arrayDataTable.sort((a, b) => b.work_dependency.name.localeCompare(a.work_dependency.name))
      }
      return;
    }

    if (column == 'especiality') {
      if (asc) {
        arrayDataTable.sort((a, b) => a.especiality.name.localeCompare(b.especiality.name))
      } else {
        arrayDataTable.sort((a, b) => b.especiality.name.localeCompare(a.especiality.name))
      }
      return;
    }

    if (column == 'reubication') {
      if (asc) {
        arrayDataTable.sort((a, b) => a.reubication.name.localeCompare(b.reubication.name))
      } else {
        arrayDataTable.sort((a, b) => b.reubication.name.localeCompare(a.reubication.name))
      }
      return;
    }


    if (asc) {
      arrayDataTable.sort((a, b) => a[column].localeCompare(b[column]))
    } else {
      arrayDataTable.sort((a, b) => b[column].localeCompare(a[column]))
    }
  }
}
