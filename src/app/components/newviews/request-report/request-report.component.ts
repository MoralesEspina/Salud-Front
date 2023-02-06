import { Component, OnInit } from '@angular/core';
import { Claims } from 'src/app/models/claims.model';
import { RequestpermissionService } from 'src/app/services/request-permission.service';
import { UserService } from 'src/app/services/user.service';

interface estado {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './request-report.component.html',
  styleUrls: ['./request-report.component.scss']
})

export class RequestReportComponent implements OnInit {
public p: number = 1;
  public permissionreq: any;
  startDateInput: string
  endDateInput: string;
  estados: estado[] = [
    {value: 'En Espera', viewValue: 'En Espera'},
    {value: 'Aceptada', viewValue: 'Aceptada'},
    {value: 'Denegada', viewValue: 'Denegada'},
    {value: '', viewValue: 'Todas'},
  ];
  constructor(

    private userService: UserService,
    private _permission: RequestpermissionService,
  ) { }

  ngOnInit() {

  }


  getPermissions(startDate: string, endDate: string){
    this.startDateInput = startDate || this.startDateInput
    this.endDateInput = endDate || this.endDateInput
    if (!startDate || !endDate) {
      return
    }
    else {
      startDate = this.formatDate(startDate)
      endDate = this.formatDate(endDate)
    }

    this._permission.getAllRequestPermission(startDate, endDate).subscribe(
      response =>{
        this.permissionreq = response.data;

      } , err => console.log(err)
    )
  }

  formatDate(date): string {
    var emitteddate = new Date(date)
    return `${emitteddate.getFullYear()}-${emitteddate.getMonth() + 1}-${emitteddate.getDate()}`
  }



}
