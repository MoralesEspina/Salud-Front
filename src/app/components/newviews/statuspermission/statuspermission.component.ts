import { Component, OnInit } from '@angular/core';
import { Claims } from 'src/app/models/claims.model';
import { IPermission } from 'src/app/models/permission';
import { IPerson } from 'src/app/models/person.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PersonService } from 'src/app/services/person.service';
import { RequestpermissionService } from 'src/app/services/request-permission.service';
import { UserService } from 'src/app/services/user.service';
import { Permission } from 'src/app/utils/reports/Permission';

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
    private personService: PersonService,
    private constancyService: AuthorizationService,
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
        console.log(this.permissionreq2)
      }, error =>{

      }
    )
  }

  PrintConstancy(uuidPerson, uuidPermission) {
    this.personService.OnePerson(uuidPerson)
      .subscribe(async data => {
        let person = new IPerson();
        person = data['data']
        this._permission.getOneRequestPermission(uuidPermission)
          .subscribe(async data => {
            let permission = new IPermission('','','','','','','','','','');
            permission = data['data']
            this.constancyService.GetConfigurationFile('constancy')
              .subscribe(async configuration => {
                await Permission(person, permission, configuration['data']).then(
                  pdf => {
                    pdf.create().print()
                  }
                )
              }, async err => {
                console.log(err)
                await Permission(person,permission, null).then(
                  pdf => {
                    pdf.create().print()
                  }
                )
              })
          })
      })
  }

}
