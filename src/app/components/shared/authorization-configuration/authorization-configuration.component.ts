import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfigurationauthorizationfileComponent } from 'src/app/components/partials/configurationauthorizationfile/configurationauthorizationfile.component';
import { Claims } from 'src/app/models/claims.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-authorization-configuration',
  templateUrl: './authorization-configuration.component.html',
  styleUrls: ['./authorization-configuration.component.scss']
})
export class AuthorizationConfigurationComponent implements OnInit {
  @Input()
  url: string;

  @Input()
  component: string;

  user: Claims = new Claims();

  constructor(
    private dialog: MatDialog,
    private authService: UserService
  ) {
    this.user.rol = this.authService.userValue.rol;
  }

  ngOnInit() {

  }

  ShowConfigurationAuthorizationModal() {
    const modalDialog = this.dialog.open(ConfigurationauthorizationfileComponent, {
      disableClose: true,
      autoFocus: true,
      width: '800px',
      data: {
        url: this.url,
      }
    })

    modalDialog.afterClosed()
      .subscribe(
        result => {
          if (result) {
            console.log(result);
          }
        }
      )
  }
}
