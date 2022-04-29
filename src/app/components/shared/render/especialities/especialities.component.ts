import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WorkComponent } from 'src/app/components/partials/work/work.component';
import { Claims } from 'src/app/models/claims.model';
import { UserService } from 'src/app/services/user.service';
import { WorkService } from 'src/app/services/work.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-especialities',
  templateUrl: './especialities.component.html',
  styleUrls: ['./especialities.component.scss']
})
export class EspecialitiesComponent implements OnInit {
  user: Claims = new Claims()
  @Output() especialitySaved = new EventEmitter<boolean>();

  constructor(
    private dialog: MatDialog,
    private authServie: UserService,
    private workjobService: WorkService
  ) { 
    this.user.rol = this.authServie.userValue.rol
  }

  ngOnInit() {
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

              this.especialitySaved.emit(true);
            }, e => console.log(e))
        }
      })
  }
}
