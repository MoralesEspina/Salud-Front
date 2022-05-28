import { Job } from 'src/app/models/job.model';
import { ExperienceI } from './../../../models/experience.model';
import { CurriculumService } from './../../../services/curriculum.service';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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

  civilstatus: any[] = [
    'SOLTERO','CASADO','DIVORCIADO','VIUDO'
  ];
  ethnicity: any[] = [
    'MAYA','LADINO','GARIFUNA','XINKA'
  ];
  relationship: any[] = [
    'ABUELO','ABUELA','PADRE','MADRE','HERMANO','HERMANA','HIJO','HIJA','TIO','TIA','PRIMO','PRIMA','TIO','SOBRINO','SOBRINA'
  ];

  addressForm = this.fb.group({

      //----------Form Person----------//
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    otherName: null,
    firstSurname: [null, Validators.required],
    lastSurname: [null, Validators.required],
    surnameOfEach: null,

    //----------Form Curriculum----------//
    directionCU: [null, Validators.required],
    countryCU: [null, Validators.required],
    homePhone:[null, Validators.required],
    bornPlace:[null, Validators.required],
    nacionality:[null, Validators.required],
    municipality:[null, Validators.required],
    village:[null, Validators.required],
    workPhone:[null, Validators.required],
    age:[null, Validators.required],
    civilstatus:[null, Validators.required],
    etnia:[null, Validators.required],
    passport:[null, Validators.required],
    license:[null, Validators.required],

     //----------Form References----------//
    nameRF:[null, Validators.required],
    phoneRF:[null, Validators.required],
    relationship:[null, Validators.required],
    borndate:[null, Validators.required],
    profession:[null, Validators.required],
    company:[null, Validators.required],
    isFamiliar:[Validators.required],

    //----------Form PersonEducation----------//
    countryPE:[null, Validators.required],
    establishment:[null, Validators.required],
    periodof:[null, Validators.required],
    periodto:[null, Validators.required],
    cartificate:[null, Validators.required],
    status:[null, Validators.required],
    grade:[null, Validators.required],

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


  hasUnitNumber = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private curriculumService : CurriculumService) {}


  modelExperience: ExperienceI | undefined;
  tableExperience: ExperienceI[] | undefined;

  ngOnInit(): void {
    this.loadExperience();

  }
  onSubmit() {
    alert('Thanks!');
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
