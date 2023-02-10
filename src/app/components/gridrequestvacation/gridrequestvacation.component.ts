import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Claims } from 'src/app/models/claims.model';
import { IPerson } from 'src/app/models/person.model';
import { RequestVacation } from 'src/app/models/requestVacation.models';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { RequestVacationService } from 'src/app/services/request-vacation.service';
import { UserService } from 'src/app/services/user.service';
import { VacationRequestPDF } from 'src/app/utils/reports/VacationRequest';
import Swal from 'sweetalert2';
import pdfFonts from '../../fonts/custom/times-new-roman';
import { VacationrequestComponent } from '../pdfs/vacationrequest/vacationrequest.component';

@Component({
  selector: 'app-gridrequestvacation',
  templateUrl: './gridrequestvacation.component.html',
  styleUrls: ['./gridrequestvacation.component.scss']
})
export class GridrequestvacationComponent implements OnInit {

  requestsVacation: RequestVacation[] = [];
  requestVacation: RequestVacation;
  user = new Claims();
  search: string;
  public p:number = 1;
  public tableSize:number = 25;

  constructor(
    private requestVacationService: RequestVacationService,
    private configuration: AuthorizationService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.user = this.userService.userValue;
    this.GetRequestVacations();
  }

  GetRequestVacations() {
    this.requestVacationService.getRequestVacations()
      .subscribe(data => {
        this.requestsVacation = data['data']
      })
  }

  DeleteRequest(id: string) {
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
        this.requestVacationService.DeleteOneRequestVacations(id)
          .subscribe(data => {
            this.GetRequestVacations();
            Swal.fire({
              icon: 'success',
              title: `<span class="text-gray-900"> Registro borrado exitosamente </span>`,
              toast: true,
              showConfirmButton: false,
              position: 'top-end',
              timer: 2000,
              background: '#ffffff',
            })
          }, err => console.log(err))

      }
    })
  }

  printPDF(uuid: string) {
    this.requestVacationService.getOneRequestVacations(uuid)
      .subscribe(data => {
        this.requestVacation = data['data']
        this.configuration.GetConfigurationFile('requestvacation')
          .subscribe(datapdf => {
            VacationRequestPDF(this.requestVacation, datapdf['data'])
              .then(pdf => {
                pdf.create().print();
              })
          }, err => {
            console.log(err);
            VacationRequestPDF(this.requestVacation, null);
          })

      })
  }

  UpdateRequestVacation(uuidPerson) {
    this.requestVacationService.getOneRequestVacations(uuidPerson).subscribe(data => {
      const modalDialog = this.dialog.open(VacationrequestComponent, {
        disableClose: true,
        autoFocus: true,
        width: '800px',
        height: '850px',
        data: {
          person: new IPerson(),
          requestVacation: data['data'],
          action: 'Editar'
        }
      })

      modalDialog.afterClosed()
        .subscribe(result => {

          if (result) {
            if (result.action === 'Editar') {
              this.requestVacationService.updateRequestVacationService(result.data, uuidPerson)
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
                }, err => console.log(err));
            }
          }
        })
    }, err => console.log(err))
  }
}
