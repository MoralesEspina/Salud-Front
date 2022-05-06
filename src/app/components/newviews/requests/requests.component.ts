import { WorkComponent } from './../../partials/work/work.component';
import { ConfigurationauthorizationfileComponent } from './../../partials/configurationauthorizationfile/configurationauthorizationfile.component';
import { PersonmodalComponent } from './../../partials/personmodal/personmodal.component';
import { VacationRequestPDF } from 'src/app/utils/reports/VacationRequest';
import { VacationrequestComponent } from './../../pdfs/vacationrequest/vacationrequest.component';
import { CreatePDFVacationAuthorization } from 'src/app/utils/reports/VacationAuthorization';
import { DocumentComponent } from './../../partials/document/document.component';
import { LocalService } from './../../../services/local.service';
import { WorkService } from 'src/app/services/work.service';
import { AuthorizationService } from './../../../services/authorization.service';
import { PersonService } from './../../../services/person.service';
import { UserService } from 'src/app/services/user.service';
import { RequestVacation } from './../../../models/requestVacation.models';
import { IAuthorization } from './../../../models/authorization';
import { IPerson } from './../../../models/person.model';
import { Claims } from './../../../models/claims.model';
import { DashboardComponent } from './../../dashboard/dashboard.component';
import pdfFonts from '../../../fonts/fonts/fonts.js'
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RequestsDataSource, RequestsItem } from './requests-datasource';
import { MatDialog } from '@angular/material';
import Swal from 'sweetalert2';
import { RequestVacationService } from 'src/app/services/request-vacation.service';


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
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})

export class RequestsComponent implements OnInit {
  search = this.localService.getJsonValue('filter');
  limit: any = this.localService.getJsonValue('limit');
  countBook = '';
  page: number = 1

  user: Claims = new Claims()
  persons: IPerson[] = []

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
    private localService: LocalService
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
}
