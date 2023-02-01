import { EducationI } from './../../../models/personEducation.model';
import { ExperienceI } from './../../../models/experience.model';
import { CurriculumService } from './../../../services/curriculum.service';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CurriculumDataI } from 'src/app/models/curriculum.model';
import { ReferenceI } from 'src/app/models/references.model';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { MatDialog } from '@angular/material';
import { UploadavatarComponent } from '../../partials/uploadavatar/uploadavatar.component';
import { LocalService } from 'src/app/services/local.service';
import { AvatarsService } from 'src/app/services/avatars.service';

export interface Family {
  name: string;
  telephone: string;
  relationship: string;
  dateofbirth: string;
}


@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})

export class CurriculumComponent {
  urlImage: string;
  civilStatus: any[] = [
    'Soltero', 'Casado', 'Divorciado', 'Viudo'
  ];
  ethnicity: any[] = [
    'Maya', 'Ladino', 'Garifuna', 'Xinka'
  ];
  relationship: any[] = [
    'Abuelo', 'Abuela', 'Padre', 'Madre', 'Hermano', 'Hermana', 'Hijo', 'Hija', 'Tio', 'Tia', 'Primo', 'Prima', 'Sobrino', 'Sobrina'
  ];

  addressFormRefPer = this.fb.group({
    //----------Form References----------//
    name: [null, Validators.required],
    phone: [null, Validators.required],
    relationship: [null, Validators.required],
    profession: [null, Validators.required],
    company: [null, Validators.required],
  });

  addressFormPersonEducation = this.fb.group({
    //----------Form PersonEducation----------//
    country: [null, Validators.required],
    establishment: [null, Validators.required],
    periodof: [null, Validators.required],
    periodto: [null, Validators.required],
    certificate: [null, Validators.required],
    status: [null, Validators.required],
    grade: [null, Validators.required],
  });

  addressFormWorkExperience = this.fb.group({
    //----------Form WorkExperience----------//
    direction: [null, Validators.required],
    phone: [null, Validators.required],
    reason: [null, Validators.required],
    dateof: [null, Validators.required],
    dateto: [null, Validators.required],
    job: [null, Validators.required],
    bossname: [null, Validators.required],
    sector: [null, Validators.required],
    salary: [null, Validators.required],
  });

  addressFormRefFam = this.fb.group({
    name: [null, Validators.required],
    phone: [null, Validators.required],
    relationship: [null, Validators.required],
    bornDate: [null, Validators.required],
  });

  addressFormCurriculum = this.fb.group({

    //----------Form Person----------//
    fullname: [null, Validators.required],
    phone: [null],
    email: [null],
    nit: [null],
    dpi: [null],
    borndate: [null],


    //----------Form Curriculum----------//
    direction: [null],
    country: [null],
    homephone: [null],
    bornPlace: [null],
    nacionality: [null],
    municipality: [null],
    village: [null],
    workPhone: [null],
    age: [null],
    civilStatus: [null],
    etnia: [null],
    passport: [null],
    license: [null],
    department: [null],
    igss: [null],
  });


  hasUnitNumber = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private _sweetAlertService: SweetAlertService,
    private dialog: MatDialog,
    private localService: LocalService,
    private avatar: AvatarsService,
    private curriculumService: CurriculumService

    ) { }


  modelExperience: ExperienceI | undefined;
  tableExperience: ExperienceI[] | undefined;
  modelCurriculum: CurriculumDataI | undefined;
  modelEducation: EducationI | undefined;
  tableEducation: EducationI[] | undefined;
  tableRefFam: ReferenceI[] | undefined;
  tableRefPer: ReferenceI[] | undefined;
  uuid: string = this.userService.userValue.uuidPerson;
  lengthExperience;
  lengthEducation;
  lengthRefFam;
  lengthRefPer;

  ngOnInit(): void {
    this.loadExperience();
    this.loadCurriculum();
    this.loadEducation();
    this.loadRefFam();
    this.loadRefPer();
    this.urlImage = this.localService.getJsonValue('avatar');

      if (!this.urlImage) {
        this.avatar.GetAvatar().subscribe(data => {
          this.urlImage = data['data'];
          this.localService.setJsonValue('avatar', this.urlImage);
        }, err => console.log(err));
      }

  }

  //TODO EMPIEZAN METODOS PARA CARGAR DE DATOS
  loadCurriculum() {
    let id_entrada = this.userService.userValue.uuidPerson;
    if (id_entrada) {
      this.curriculumService.GetCurriculum(id_entrada).subscribe(
        data => {
          this.modelCurriculum = data['data'];
          this.addressFormCurriculum.patchValue({
            'fullname': this.modelCurriculum.fullname,
            'phone': this.modelCurriculum.phone,
            'email': this.modelCurriculum.email,
            'nit': this.modelCurriculum.nit,
            'dpi': this.modelCurriculum.dpi,
            'borndate': this.modelCurriculum.bornDate,
            'direction': this.modelCurriculum.direction,
            'country': this.modelCurriculum.country,
            'homephone': this.modelCurriculum.homephone,
            'bornPlace': this.modelCurriculum.bornPlace,
            'nacionality': this.modelCurriculum.nacionality,
            'municipality': this.modelCurriculum.municipality,
            'village': this.modelCurriculum.village,
            'workPhone': this.modelCurriculum.workPhone,
            'age': this.modelCurriculum.age,
            'civilStatus': this.modelCurriculum.civilStatus,
            'etnia': this.modelCurriculum.etnia,
            'passport': this.modelCurriculum.passport,
            'license': this.modelCurriculum.license,
            'department': this.modelCurriculum.department,
            'igss': this.modelCurriculum.igss,
          });
        }
      )
    }
  }

  loadEducation() {
    let id_entrada = this.userService.userValue.uuidPerson;
    if (id_entrada) {
      this.curriculumService.GetEducation(id_entrada).subscribe(
        data => {
          this.tableEducation = data['data'];
          this.lengthEducation = this.tableEducation.length
        }
      )
    }
  }

  loadRefFam() {
    let id_entrada = this.userService.userValue.uuidPerson;
    if (id_entrada) {
      this.curriculumService.GetRefFam(id_entrada).subscribe(
        data => {
          this.tableRefFam = data['data'];
          this.lengthRefFam = this.tableRefFam.length
        }
      )
    }
  }

  loadRefPer() {
    let id_entrada = this.userService.userValue.uuidPerson;
    if (id_entrada) {
      this.curriculumService.GetRefPer(id_entrada).subscribe(
        data => {
          this.tableRefPer = data['data'];
          this.lengthRefPer = this.tableRefPer.length
        }
      )
    }
  }

  loadExperience() {
    let id_entrada = this.userService.userValue.uuidPerson;
    if (id_entrada) {
      this.curriculumService.GetExperience(id_entrada).subscribe(
        data => {
          this.tableExperience = data['data'];
          this.lengthExperience = this.tableExperience.length
        }
      )
    }
  }

  //TODO TERMINAN METODOS PARA CARGAR DE DATOS

  //TODO EMPIEZAN METODOS PARA AGREGAR DE DATOS

  aggEducation() {
    let id_entrada = this.userService.userValue.uuidPerson;
    const education: EducationI = {
      uuid: '0',
      uuidPerson: id_entrada,
      country: this.addressFormPersonEducation.value.country,
      establishment: this.addressFormPersonEducation.value.establishment,
      periodof: this.addressFormPersonEducation.value.periodof,
      periodto: this.addressFormPersonEducation.value.periodto,
      certificate: this.addressFormPersonEducation.value.certificate,
      status: this.addressFormPersonEducation.value.status,
      grade: this.addressFormPersonEducation.value.grade,
    }

    this.curriculumService.createPersonEducation(education).subscribe(data => {
      this._sweetAlertService.createAndUpdate('Registro creado con éxito');
      this.loadEducation();
    }, error => {
      this._sweetAlertService.error('No se pudo crear el registro');
    });
  }

  aggRefFam() {
    let id_entrada = this.userService.userValue.uuidPerson;
    const refFam: ReferenceI = {
      uuid: '',
      uuidPerson: id_entrada,
      name: this.addressFormRefFam.value.name,
      phone: this.addressFormRefFam.value.phone,
      relationship: this.addressFormRefFam.value.relationship,
      bornDate: this.addressFormRefFam.value.bornDate,
      profession: null,
      company: null,
      isfamiliar: true,
    }
    this.curriculumService.createRef(refFam).subscribe(data => {
      this._sweetAlertService.createAndUpdate('Registro creado con éxito');
      this.loadRefFam();
    }, error => {
      this._sweetAlertService.error('No se pudo crear el registro');
    });
  }

  aggRefPer() {
    let id_entrada = this.userService.userValue.uuidPerson;
    const refPer: ReferenceI = {
      uuid: '',
      uuidPerson: id_entrada,
      name: this.addressFormRefPer.value.name,
      phone: this.addressFormRefPer.value.phone,
      relationship: this.addressFormRefPer.value.relationship,
      bornDate: null,
      profession: this.addressFormRefPer.value.profession,
      company: this.addressFormRefPer.value.company,
      isfamiliar: false,
    }
    this.curriculumService.createRef(refPer).subscribe(data => {
      this._sweetAlertService.createAndUpdate('Registro creado con éxito');
      this.loadRefPer();
    }, error => {
      this._sweetAlertService.error('No se pudo crear el registro');
    });
  }

  aggWorkExp() {
    let id_entrada = this.userService.userValue.uuidPerson;
    const workExpr: ExperienceI = {
      uuid: '0',
      uuidPerson: id_entrada,
      direction: this.addressFormWorkExperience.value.direction,
      phone: this.addressFormWorkExperience.value.phone,
      reason: this.addressFormWorkExperience.value.reason,
      dateof: this.addressFormWorkExperience.value.dateof,
      dateto: this.addressFormWorkExperience.value.dateto,
      job: this.addressFormWorkExperience.value.job,
      bossname: this.addressFormWorkExperience.value.bossname,
      sector: this.addressFormWorkExperience.value.sector,
      salary: this.addressFormWorkExperience.value.salary,
    }
    this.curriculumService.createWorkExp(workExpr).subscribe(data => {
      this._sweetAlertService.createAndUpdate('Registro creado con éxito');
      this.loadExperience();
    }, error => {
      this._sweetAlertService.error('No se pudo crear el registro');
    });
  }

  //TODO TERMINAN METODOS PARA AGREGAR DE DATOS

  //TODO METODO PARA EDITAR DE DATOS
  editCurriculum() {
    let id_entrada = this.userService.userValue.uuidPerson;
    const curriculum: CurriculumDataI = {
      uuid: '0',
      uuidPerson: id_entrada,
      direction: this.addressFormCurriculum.value.direction,
      country: this.addressFormCurriculum.value.country,
      homephone: this.addressFormCurriculum.value.homephone,
      bornPlace: this.addressFormCurriculum.value.bornPlace,
      nacionality: this.addressFormCurriculum.value.nacionality,
      municipality: this.addressFormCurriculum.value.municipality,
      village: this.addressFormCurriculum.value.village,
      workPhone: this.addressFormCurriculum.value.workPhone,
      age: this.addressFormCurriculum.value.age,
      civilStatus: this.addressFormCurriculum.value.civilStatus,
      etnia: this.addressFormCurriculum.value.etnia,
      passport: this.addressFormCurriculum.value.passport,
      license: this.addressFormCurriculum.value.license,
      department: this.addressFormCurriculum.value.department,
      igss: this.addressFormCurriculum.value.igss,
      phone: this.addressFormCurriculum.value.phone,
      email: this.addressFormCurriculum.value.email,
      dpi: this.addressFormCurriculum.value.dpi,
      nit: this.addressFormCurriculum.value.nit,
      bornDate: this.addressFormCurriculum.value.borndate,
      fullname:''
    }

    this.curriculumService.editCurriculum(curriculum,id_entrada).subscribe(data => {
      this._sweetAlertService.createAndUpdate('Registro actualizado con éxito');
      this.loadCurriculum();
    }, error => {
      this._sweetAlertService.error('No se pudo editar el registro');
    });
  }

  //TODO EMPIEZAN METODOS PARA ELIMINAR LOS DATOS

  deleteEducation(id){
      Swal.fire({
        title: 'Estas seguro?',
        text: "No podras revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No, Cancelar!',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borralo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.curriculumService.deleteEducation(id).subscribe(data => {
            this._sweetAlertService.deleteOneConfirmation('Registro eliminado con éxito');
            this.loadEducation();
          }, error => {
            this._sweetAlertService.deleteOneError('No se ha podido eliminar el registro', error);
          });
        }
      })
  }

  deleteRefFam(id){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, Cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.curriculumService.deleteRefFam(id).subscribe(data => {
          this._sweetAlertService.deleteOneConfirmation('Registro eliminado con éxito');
          this.loadRefFam();
        }, error => {
          this._sweetAlertService.deleteOneError('No se ha podido eliminar el registro', error);
        });
      }
    })
  }

  deleteRefPer(id){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, Cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.curriculumService.deleteRefPer(id).subscribe(data => {
          this._sweetAlertService.deleteOneConfirmation('Registro eliminado con éxito');
          this.loadRefPer();
        }, error => {
          this._sweetAlertService.deleteOneError('No se ha podido eliminar el registro', error);
        });
      }
    })
  }

  deleteWorkExp(id){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, Cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.curriculumService.deleteExperience(id).subscribe(data => {
          this._sweetAlertService.deleteOneConfirmation('Registro eliminado con éxito');
          this.loadExperience();
        }, error => {
          this._sweetAlertService.deleteOneError('No se ha podido eliminar el registro', error);
        });
      }
    })
  }

    //TODO TERMINAR METODOS PARA ELIMINAR LOS DATOS


  async UploadAvatar() {
    const modalDialog = this.dialog.open(UploadavatarComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px',
    })

    modalDialog.afterClosed().subscribe(
      data => {
        if (data) {
          this.urlImage = data['data'].imageURL
          this.localService.setJsonValue('avatar', this.urlImage);
        }
      },
      err => console.log(err))
  }

}

