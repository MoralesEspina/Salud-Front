import { RequestpermissionService } from './../../services/request-permission.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { IAuthorization } from 'src/app/models/authorization';
import { Claims } from 'src/app/models/claims.model';
import { IPermission } from 'src/app/models/permission.js';
import { IPerson } from 'src/app/models/person.model';
import { RequestVacation } from 'src/app/models/requestVacation.models';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { LocalService } from 'src/app/services/local.service.js';
import { PersonService } from 'src/app/services/person.service';
import { RequestVacationService } from 'src/app/services/request-vacation.service';
import { UserService } from 'src/app/services/user.service';
import { WorkService } from 'src/app/services/work.service';
import { CreatePDFVacationAuthorization } from 'src/app/utils/reports/VacationAuthorization';
import { VacationRequestPDF } from 'src/app/utils/reports/VacationRequest';
import Swal from 'sweetalert2';
import pdfFonts from '../../fonts/fonts/fonts.js';
import { ConfigurationauthorizationfileComponent } from '../partials/configurationauthorizationfile/configurationauthorizationfile.component';
import { DocumentComponent } from '../partials/document/document.component';
import { PermissionComponent } from '../partials/permission/permission.component.js';
import { PersonmodalComponent } from '../partials/personmodal/personmodal.component';
import { WorkComponent } from '../partials/work/work.component';
import { PermissionrequestComponent } from '../pdfs/permissionrequest/permissionrequest.component.js';
import { VacationrequestComponent } from '../pdfs/vacationrequest/vacationrequest.component';
import { Constancy } from 'src/app/utils/reports/Constancy';


PdfMakeWrapper.setFonts(pdfFonts, {
  times: {
    normal: 'times.ttf',
    bold: 'times-bold.ttf',
    italics: 'times-bold.ttf',
    bolditalics: 'times.ttf'
  }
})

PdfMakeWrapper.useFont('times')

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  search = this.localService.getJsonValue('filter');
  limit: any = this.localService.getJsonValue('limit');
  countBook = '';
  page: number = 1

  user: Claims = new Claims()
  persons: IPerson[] = []
  uuidactual= this.authServie.userValue.uuidPerson

  displayedColumns: string[] = ['fullname', 'cui', 'ACCIONES'];
  dataSource: { filter: string; };
  IAuthorization: IAuthorization;
  requestVacation: RequestVacation;

  constructor(
    private authServie: UserService,
    private personService: PersonService,
    private authService: AuthorizationService,
    private workjobService: WorkService,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    private requestVacService: RequestVacationService,
    private localService: LocalService,
    private RequestpermissionService: RequestpermissionService,
    private userService: UserService,
    private constancyService: AuthorizationService
  ) {
    this.localService.getJsonValue('limit');
    this.ManyPersons();
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // requestVacService.createRequestVacationService().subscribe(data => console.log(data))
  }

  ngOnInit() {

    this.user.rol = this.authServie.userValue.rol;
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

    this.personService.ManyPersons(page, stlimit, stFilter)
      .subscribe(res => {
        this.persons = res['data']
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

  autho = new Document()
  authorization = new IAuthorization()

  CreateAuthorizationDialog(IPerson: IPerson) {
    const modalDialog = this.dialog.open(DocumentComponent, {
      disableClose: true,
      autoFocus: true,
      width: '800px',
      height: '892px',
      data: {
        person: IPerson
      }
    })

    modalDialog.afterClosed()
      .subscribe(result => {
        if (result) {
          this.authService.createAuthorization(result)
            .subscribe(data => {
              if (data['ok']) {
                this.authService.GetConfigurationFile('authorization')
                  .subscribe(dataConf => {
                    CreatePDFVacationAuthorization(data['data'], result.body, dataConf['data'])
                      .then(pdf => {
                        pdf.create().print();
                      })
                  }, err => console.log(err))

              } else {
                Swal.fire({
                  icon: 'error',
                  title: data['message'],
                  toast: true,
                  showConfirmButton: false,
                  position: 'top-end',
                  timer: 2000,
                  background: '#ffffff',
                })
              }
            }, err => { console.log(err) })
        }
      })
  }


  createRequestAuthorizationModal(uuidPerson: string) {
    this.personService.OnePerson(uuidPerson).subscribe(data => {
      const modalDialog = this.dialog.open(VacationrequestComponent, {
        disableClose: true,
        autoFocus: true,
        width: '800px',
        height: '850px',
        data: {

          person: data['data'],
          requestVacation: new RequestVacation(),
          action: 'Crear'
        }
      })

      modalDialog.afterClosed()
        .subscribe(result => {
          if (result) {
            if (result.action === 'Crear') {
              this.requestVacService.createRequestVacationService(result.data)
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

                  this.requestVacService.getOneRequestVacations(data['data'])
                    .subscribe(data => {
                      this.authService.GetConfigurationFile('requestvacation')
                        .subscribe(dataConf => {
                          VacationRequestPDF(data['data'], dataConf['data'])
                            .then(pdf => {
                              pdf.create().print();
                            })
                        }, err => console.log(err))

                    })
                });
            } else {
              this.requestVacService.updateRequestVacationService(result.data, result.data.person.uuid)
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
                }, err => console.log(err))
            }
          }
        })
    }, err => console.log(err))

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

  CreatePerson() {
    const modalDialog = this.dialog.open(PersonmodalComponent, {
      disableClose: true,
      autoFocus: true,
      width: '600px',
      data: {
        person: new IPerson(),
        action: 'Crear'
      }
    })

    modalDialog.afterClosed()
      .subscribe(result => {

        if (result) {
          this.personService.CreatePerson(result)
            .subscribe(ok => {
              this.ManyPersons()
            }, err => console.log(err))
        }
      })
  }

  CustomConfigurationAuthorization() {
    const modalDialog = this.dialog.open(ConfigurationauthorizationfileComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px',

    })

    modalDialog.afterClosed()
      .subscribe(data => {
      })
  }

  customModal(data, title) {
    const modalDialog = this.dialog.open(WorkComponent, {
      disableClose: true,
      autoFocus: true,
      width: '600px',
      data: {
        component: data,
        title: title
      }
    })
    let dataworkjob;
    modalDialog.afterClosed()
      .subscribe(result => {
        if (result) {
          if (result.component == 'jobs') {
            dataworkjob = {
              job: result.name
            }
          } else {
            dataworkjob = {
              name: result.name
            }
          }

          this.workjobService.createJobOrWork(dataworkjob, result.component)
            .subscribe(exit => {
              Swal.fire({
                title: 'Creado correctamente',
                timer: 2000,
                timerProgressBar: true
              })
            }, e => console.log(e))
        }
      });
  }

  /**
   *
   * Borrar el registro de una persona
   */

  deletePerson(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Borrar el registro!',
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
          title: `<span class="text-gray-900"> Registro borrado exitosamente </span>`,
          toast: true,
          showConfirmButton: false,
          position: 'top-end',
          timer: 2000,
          background: '#ffffff',
        })
      }
    })
  }

  PrintConstancy(uuidPerson) {
    this.personService.OnePerson(uuidPerson)
    .subscribe(async data => {
      let person = new IPerson();
      person = data['data']
      this.constancyService.GetConfigurationFile('constancy')
        .subscribe(async configuration => {
          await Constancy(person, configuration['data']).then(
            pdf => {
              pdf.create().print()
            }
          )
        }, async err => {
          console.log(err)
          await Constancy(person, null).then(
            pdf => {
              pdf.create().print()
            }
          )
        })
    })
}


}
