import { Component, OnInit } from '@angular/core';
import { Claims } from 'src/app/models/claims.model';
import { RequestpermissionService } from 'src/app/services/request-permission.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './statuspermission.component.html',
  styleUrls: ['./statuspermission.component.scss']
})
export class StatuspermissionComponent implements OnInit {
  user = new Claims();
  public permissionreq;
  public permissionreq2;
  constructor(

    private userService: UserService,
    private _permission: RequestpermissionService,
  ) { }

  ngOnInit() {
    this.user = this.userService.userValue;
    this.getPermissions();
    this.getPermissions2();
  }


  getPermissions(){
    let id_entrada = this.userService.userValue.uuidPerson;
    this._permission.getPermissionsUser(id_entrada).subscribe(
      response =>{
        this.permissionreq = response.data;
      }, error =>{

      }
    )
  }
  getPermissions2(){
    let id_entrada = this.userService.userValue.uuidPerson;
    this._permission.getPermissionsUserHistory(id_entrada).subscribe(
      response =>{
        this.permissionreq2 = response.data;
      }, error =>{

      }
    )
  }


}
