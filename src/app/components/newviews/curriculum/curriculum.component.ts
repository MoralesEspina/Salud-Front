import { EducationI } from './../../../models/personEducation.model';
import { ExperienceI } from './../../../models/experience.model';
import { CurriculumService } from './../../../services/curriculum.service';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CurriculumDataI } from 'src/app/models/curriculum.model';
import { ReferenceI } from 'src/app/models/references.model';

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

  civilStatus: any[] = [
    'SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO'
  ];
  ethnicity: any[] = [
    'MAYA', 'LADINO', 'GARIFUNA', 'XINKA'
  ];
  relationship: any[] = [
    'ABUELO', 'ABUELA', 'PADRE', 'MADRE', 'HERMANO', 'HERMANA', 'HIJO', 'HIJA', 'TIO', 'TIA', 'PRIMO', 'PRIMA', 'TIO', 'SOBRINO', 'SOBRINA'
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
    phone: [null, Validators.required],
    email: [null, Validators.required],
    nit: [null, Validators.required],
    dpi: [null, Validators.required],
    borndate: [null, Validators.required],


    //----------Form Curriculum----------//
    direction: [null, Validators.required],
    country: [null, Validators.required],
    homephone: [null, Validators.required],
    bornPlace: [null, Validators.required],
    nacionality: [null, Validators.required],
    municipality: [null, Validators.required],
    village: [null, Validators.required],
    workPhone: [null, Validators.required],
    age: [null, Validators.required],
    civilStatus: [null, Validators.required],
    etnia: [null, Validators.required],
    passport: [null, Validators.required],
    license: [null, Validators.required],
    department: [null, Validators.required],
    igss: [null, Validators.required],
  });


  hasUnitNumber = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private curriculumService: CurriculumService) { }


  modelExperience: ExperienceI | undefined;
  tableExperience: ExperienceI[] | undefined;
  modelCurriculum: CurriculumDataI | undefined;
  modelEducation: EducationI | undefined;
  tableEducation: EducationI[] | undefined;
  tableRefFam: ReferenceI[] | undefined;
  tableRefPer: ReferenceI[] | undefined;
  uuid: string = this.userService.userValue.uuidPerson;

  ngOnInit(): void {
    this.loadExperience();
    this.loadCurriculum();
    this.loadEducation();
    this.loadRefFam();
    this.loadRefPer();
  }

  loadCurriculum() {
    let id_entrada = this.userService.userValue.uuidPerson;
    if (id_entrada) {
      this.curriculumService.GetCurriculum(id_entrada).subscribe(
        data => {
          this.modelCurriculum = data['data'];
          this.addressFormCurriculum.setValue({
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
        }
      )
    }
  }

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
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cliente Creado con Exito',
        showConfirmButton: false,
        timer: 700
      })
      setTimeout(location.reload.bind(location), 700);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'No se ha podido ingresar el cliente',
        text: error.message,
      })
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
    console.log(refFam)
    this.curriculumService.createRef(refFam).subscribe(data => {
      console.log(data)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cliente Creado con Exito',
        showConfirmButton: false,
        timer: 700
      })
      setTimeout(location.reload.bind(location), 700);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'No se ha podido ingresar el cliente',
        text: error.message,
      })
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
    console.log(refPer)
    this.curriculumService.createRef(refPer).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cliente Creado con Exito',
        showConfirmButton: false,
        timer: 700
      })
      setTimeout(location.reload.bind(location), 700);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'No se ha podido ingresar el cliente',
        text: error.message,
      })
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
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cliente Creado con Exito',
        showConfirmButton: false,
        timer: 700
      })
      setTimeout(location.reload.bind(location), 700);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'No se ha podido ingresar el cliente',
        text: error.message,
      })
    });
  }

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
      phone: '',
      email:'',
      dpi:'',
      nit:'',
      bornDate: null,
      fullname:''
    }
    this.curriculumService.editCurriculum(curriculum,id_entrada).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro Actualizado con Exito',
        showConfirmButton: false,
        timer: 700
      })
      setTimeout(location.reload.bind(location), 700);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'No se ha podido ingresar el cliente',
        text: error.message,
      })
    });
  }
}

