import { ExperienceI } from './../../../models/experience.model';
import { CurriculumService } from './../../../services/curriculum.service';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CurriculumDataI } from 'src/app/models/curriculum.model';

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

  /*curriculum: CurriculumData ={
    uuid:'',
    uuidPerson:'',
    direction: '',
    country: '',
    homePhone: '',
    bornPlace: '',
    nacionality: '',
    municipality: '',
    village: '',
    workPhone: '',
    age: '',
    civilStatus: '',
    etnia: '',
    passport: '',
    license: '',
  }*/

  civilStatus: any[] = [
    'SOLTERO','CASADO','DIVORCIADO','VIUDO'
  ];
  ethnicity: any[] = [
    'MAYA','LADINO','GARIFUNA','XINKA'
  ];
  relationship: any[] = [
    'ABUELO','ABUELA','PADRE','MADRE','HERMANO','HERMANA','HIJO','HIJA','TIO','TIA','PRIMO','PRIMA','TIO','SOBRINO','SOBRINA'
  ];

  addressFormReferences = this.fb.group({
     //----------Form References----------//
     nameRF:[null, Validators.required],
     phoneRF:[null, Validators.required],
     relationship:[null, Validators.required],
     borndate:[null, Validators.required],
     profession:[null, Validators.required],
     company:[null, Validators.required],
     isFamiliar:[Validators.required],
  });

  addressFormPersonEducation = this.fb.group({
    //----------Form PersonEducation----------//
    countryPE:[null, Validators.required],
    establishment:[null, Validators.required],
    periodof:[null, Validators.required],
    periodto:[null, Validators.required],
    certificate:[null, Validators.required],
    status:[null, Validators.required],
    grade:[null, Validators.required],
  });

  addressFormWorkExperience = this.fb.group({
    //----------Form WorkExperience----------//
    direction:[null, Validators.required],
    phoneWE:[null, Validators.required],
    reason:[null, Validators.required],
    dateof:[null, Validators.required],
    dateto:[null, Validators.required],
    job:[null, Validators.required],
    bossName:[null, Validators.required],
    sector:[null, Validators.required],
    salary:[null, Validators.required],
  });
  addressFormCurriculum = this.fb.group({

      //----------Form Person----------//
    fullname: [null, Validators.required],
    phone: [null, Validators.required],
    email: [null, Validators.required],
    nit: [null, Validators.required],
    dpi: [null, Validators.required],
    bornDate:[null, Validators.required],


    //----------Form Curriculum----------//
    directionCU: [null, Validators.required],
    countryCU: [null, Validators.required],
    homephone:[null, Validators.required],
    bornPlace:[null, Validators.required],
    nacionality:[null, Validators.required],
    municipality:[null, Validators.required],
    village:[null, Validators.required],
    workPhone:[null, Validators.required],
    age:[null, Validators.required],
    civilStatus:[null, Validators.required],
    etnia:[null, Validators.required],
    passport:[null, Validators.required],
    license:[null, Validators.required],
    department:[null, Validators.required],
    igss:[null, Validators.required],
  });


  hasUnitNumber = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private curriculumService : CurriculumService) {}


  modelExperience: ExperienceI | undefined;
  tableExperience: ExperienceI[] | undefined;
  modelCurriculum: CurriculumDataI | undefined;

  ngOnInit(): void {
    this.loadExperience();
    this.loadCurriculum();

  }
  onSubmit() {
    alert('Thanks!');
  }

  loadCurriculum() {
    let id_entrada = this.userService.userValue.uuidPerson;
    if (id_entrada) {
      this.curriculumService.GetCurriculum(id_entrada).subscribe(
        data => {
          this.modelCurriculum = data['data'];
          console.log( this.modelCurriculum)
          this.addressFormCurriculum.setValue({
            'fullname': this.modelCurriculum.fullname,
            'phone': this.modelCurriculum.phone,
            'email': this.modelCurriculum.email,
            'nit': this.modelCurriculum.nit,
            'dpi': this.modelCurriculum.dpi,
            'bornDate': this.modelCurriculum.bornDate,
            'directionCU': this.modelCurriculum.direction,
            'countryCU': this.modelCurriculum.country,
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
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
          })
        })
    }
  }

  loadExperience() {
    let id_entrada = this.userService.userValue.uuidPerson;
    if (id_entrada) {
      this.curriculumService.GetExperience(id_entrada).subscribe(
        data => {
          this.tableExperience = data['data'];
          /*console.log(this.modelExperience)
          this.addressForm.setValue({
            'workAddress': this.modelExperience.workAddress,
            'workPhone': this.modelExperience.workPhone,
            'reasonForWithdrawal': this.modelExperience.reasonForWithdrawal,
            'dateOfEmployment': this.modelExperience.dateOfEmployment,
            'immediateBossName': this.modelExperience.immediateBossName,
            'sector': this.modelExperience.sector,
            'salary': this.modelExperience.salary,
          });*/
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
          })
        })
    }
  }
}
