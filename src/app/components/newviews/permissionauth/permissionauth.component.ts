import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Claims } from 'src/app/models/claims.model';
import { IPerson } from 'src/app/models/person.model';
import { RequestVacation } from 'src/app/models/requestVacation.models';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { RequestVacationService } from 'src/app/services/request-vacation.service';
import { UserService } from 'src/app/services/user.service';
import pdfFonts from 'src/app/fonts/custom/times-new-roman.js';
import { RequestpermissionService } from 'src/app/services/request-permission.service';
import { PersonService } from 'src/app/services/person.service';
import { IPermission } from 'src/app/models/permission';
import { Permission } from 'src/app/utils/reports/Permission';

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
  public permissionreq2;
  public p: number = 1;
  public p2: number = 1;
  public tableSize: number = 10;
  uuid: string = this.userService.userValue.uuidPerson;

  constructor(
    private userService: UserService,
    private _permission: RequestpermissionService
  ) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.user = this.userService.userValue;
    this.getPermissions();
    this.getPermissions2();
  }


  getPermissions(){
    let id_entrada = this.userService.userValue.uuidPerson;
    this._permission.getPermissionsBossOne(id_entrada).subscribe(
      response =>{
        this.permissionreq = response.data;
      }, error =>{

      }
    )
  }
  getPermissions2(){
    let id_entrada = this.userService.userValue.uuidPerson;
    this._permission.getPermissionsBossTwo(id_entrada).subscribe(
      response =>{
        this.permissionreq2 = response.data;
      }, error =>{

      }
    )
  }

}


