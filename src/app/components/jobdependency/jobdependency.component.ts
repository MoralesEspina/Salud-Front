import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Claims } from 'src/app/models/claims.model';
import { IEspeciality } from 'src/app/models/especiality.model';
import { Job } from 'src/app/models/job.model';
import { IWork } from 'src/app/models/work.model';
import { UserService } from 'src/app/services/user.service';
import { WorkService } from 'src/app/services/work.service';
import Swal from 'sweetalert2';
import { WorkComponent } from '../partials/work/work.component';


@Component({
  selector: 'app-jobdependency',
  templateUrl: './jobdependency.component.html',
  styleUrls: ['./jobdependency.component.scss']
})
export class JobdependencyComponent implements OnInit {

  user: Claims = new Claims()
  public works: IWork[] = []
  public jobs: Job[] = []
  public especialities: IEspeciality[] = [];

  constructor(private authService: UserService,
    private dialog: MatDialog,
    public workjobService: WorkService,) {

  }

  ngOnInit() {
    this.user.rol = this.authService.userValue.rol
    this.Jobs();
    this.Works();
    this.Especialities();
  }

  Jobs() {
    this.workjobService.getJobs()
      .subscribe(data => {
        this.jobs = data['data']
      }, err => console.log(err))
  }

  Especialities() {
    this.workjobService.getEspecialities()
      .subscribe(data => {
        this.especialities = data['data']
      }, err => console.log(err))
  }

  Works() {
    this.workjobService.getWorks()
      .subscribe(data => {
        this.works = data['data']
      }, err => console.log(err))
  }


  UpdateWorkJob(component: string, title: string, uuid: string, value: string) {
    const modalDialog = this.dialog.open(WorkComponent, {
      disableClose: true,
      autoFocus: true,
      width: '600px',
      data: {
        component: component, // nombre del componente para redirijir a un servicio en especial
        title: title,
        isUpdate: true,
        entityValue: value,
        uuid: uuid
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

          this.workjobService.updateJobOrWork(dataworkjob, result.component, result.uuid)
            .subscribe(exit => {
              this.SweetAlertOk('Registro actualizado correctamente')
              if (result.component === 'works') {
                this.Works();
              }

              if (result.component === 'jobs') {
                this.Jobs();
              }

              if (result.component === 'especialities') {
                this.Especialities();
              }
            }, e => console.log(e))
        }
      })
  }

  DeleteWorkDependency(uuid: string) {
    this.workjobService.deleteWorkDependency(uuid)
      .subscribe(isdeleted => {
        this.SweetAlertOk('Registro borrado exitosamente');
        this.Works();
      }, e => {
        this.SweetAlertFail(e);
      })
  }

  DeleteJob(uuid: string) {
    this.workjobService.deleteJob(uuid)
      .subscribe(isdeleted => {
        this.SweetAlertOk('Registro borrado exitosamente');
        this.Jobs();
      }, e => {
        this.SweetAlertFail(e);
      })
  }


  SweetAlertOk(message: string) {
    Swal.fire({
      icon: 'success',
      title: `<span class="text-gray-900"> ${message} </span>`,
      toast: true,
      showConfirmButton: false,
      position: 'top-end',
      timer: 2000,
      background: '#ffffff',
    })
  }

  SweetAlertFail(e: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error al borrar registro',
      text: e
    });
  }

}
