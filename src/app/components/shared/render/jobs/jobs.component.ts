import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WorkComponent } from 'src/app/components/partials/work/work.component';
import { Claims } from 'src/app/models/claims.model';
import { UserService } from 'src/app/services/user.service';
import { WorkService } from 'src/app/services/work.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  user: Claims = new Claims()
  @Output() jobSaved = new EventEmitter<boolean>();

  constructor(private workjobService: WorkService,
    private authServie: UserService,
    private dialog: MatDialog,) {
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
              name: result.name
            }
          } else {
            dataworkjob = {
              name: result.name
            }
          }

          this.workjobService.createJobOrWork(dataworkjob, result.component)
            .subscribe(exit => {
              this.jobSaved.emit(true)
              Swal.fire({
                title: 'Creado correctamente',
                timer: 2000,
                timerProgressBar: true
              })
            }, e => console.log(e))
        }
      })
  }
}
