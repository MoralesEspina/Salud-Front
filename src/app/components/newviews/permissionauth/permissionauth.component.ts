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
import { VacationrequestComponent } from '../../pdfs/vacationrequest/vacationrequest.component';
import pdfFonts from 'src/app/fonts/custom/times-new-roman.js';
import { DocumentComponent } from '../../partials/document/document.component';
import { CreatePDFVacationAuthorization } from 'src/app/utils/reports/VacationAuthorization';
import { PermissionComponent } from '../../partials/permission/permission.component';
import { RequestpermissionService } from 'src/app/services/request-permission.service';

@Component({
  selector: 'app-permissionauth',
  templateUrl: './permissionauth.component.html',
  styleUrls: ['./permissionauth.component.scss']
})
export class PermissionauthComponent implements OnInit {


  requestsVacation: RequestVacation[] = [];
  requestVacation: RequestVacation;
  user = new Claims();
  search: string;
  public permissionreq;

  constructor(
    private requestVacationService: RequestVacationService,
    private authService: AuthorizationService,
    private configuration: AuthorizationService,
    private userService: UserService,
    private dialog: MatDialog,
    private _permission: RequestpermissionService,
  ) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.user = this.userService.userValue;
    this.getPermissions();
  }


  getPermissions(){
    this._permission.getPermissions().subscribe(
      response =>{
        console.log(response)
        this.permissionreq = response.data;
      }, error =>{

      }
    )
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

}


