import { Component, OnInit } from '@angular/core';
import { Claims } from 'src/app/models/claims.model';
import { RequestpermissionService } from 'src/app/services/request-permission.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './request-report.component.html',
  styleUrls: ['./request-report.component.scss']
})
export class RequestReportComponent implements OnInit {
  public permissionreq: any;
  constructor(

    private userService: UserService,
    private _permission: RequestpermissionService,
  ) { }

  ngOnInit() {
    this.getPermissions();

  }


  getPermissions(){
    this._permission.getAllRequestPermission().subscribe(
      response =>{
        this.permissionreq = response.data;
        console.log(this.permissionreq)
      }, error =>{

      }
    )
  }

}
