import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export interface Family {
  name: string;
  telephone: string;
  relationship: string;
  dateofbirth: string;
}

export interface Reference{
  name: string;
  profession: string;
  telephone: string;
  business: string;
  relationship: string;
}

export interface Study{
  country: string;
  establishment: string;
  preiodof: string;
  periodto: string;
  diploma: string;
  condition: string;
  grade: string;
}



export interface Experience{
  workAddress: string;
  workPhone: string;
  immediateBossName: string;
  reasonForWithdrawal: string;
  sector: string;
  dateOfEmployment: string;
  salary: string;
  heldPosition: string;
}


const ELEMENT_Family: Family[] = [
  {name: 'Marta', telephone: '51342324', relationship: 'Hermano', dateofbirth: '25-03-2002'}

];

const ELEMENT_Reference: Reference[] = [
  {name: 'Marta', profession: 'Maestro', telephone: '51342324', business:'bxiuas', relationship: 'Hermano'}

];

const ELEMENT_Study: Study[] = [
];

const ELEMENT_Experience: Experience[] = [


];

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})

export class CurriculumComponent {

  displayedColumns1: string[] = ['name', 'telephone', 'relationship', 'dateofbirth'];
  dataSource1 = ELEMENT_Family;

  displayedColumns2: string[] = ['name', 'profession','telephone', 'business','relationship'];
  dataSource2 = ELEMENT_Reference;

  displayedColumns3: string[] = ['country','establishment','preiodof','periodto','diploma','condition','grade'];
  dataSource3 = ELEMENT_Study;

  displayedColumns4: string[] = ['workAddress','workPhone','immediateBossName','reasonForWithdrawal','sector','dateOfEmployment','salary','heldPosition'];
  dataSource4 = ELEMENT_Experience;

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
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    otherName: null,
    firstSurname: [null, Validators.required],
    lastSurname: [null, Validators.required],
    surnameOfEach: null,
    address: [null, Validators.required],
    country: [null, Validators.required],
    municipality:[null, Validators.required],
    department:[null, Validators.required],
    village:[null, Validators.required],
    residentialtelephone:[null, Validators.required],
    Officephone:[null, Validators.required],
    cellphone:[null, Validators.required],
    email:[null, Validators.required],
    dateofbirth:[null, Validators.required],
    age:[null, Validators.required],
    placeofbirth:[null, Validators.required],
    civilstatus:[null, Validators.required],
    nationality:[null, Validators.required],
    ethnicity:[null, Validators.required],

    cui:[null, Validators.required],
    passportnumber:[null, Validators.required],
    iggsmembershipnumber:[null, Validators.required],
    license:[null, Validators.required],
    nit:[null, Validators.required],

    name:[null, Validators.required],
    profession:[null, Validators.required],
    telephone:[null, Validators.required],
    business:[null, Validators.required],
    relationship:[null, Validators.required],

    establishment:[null, Validators.required],
    preiodof:[null, Validators.required],
    periodto:[null, Validators.required],
    diploma:[null, Validators.required],
    condition:[null, Validators.required],
    grade:[null, Validators.required],

    schema:[null, Validators.required],
    workAddress:[null, Validators.required],
    workPhone:[null, Validators.required],
    immediateBossName:[null, Validators.required],
    reasonForWithdrawal:[null, Validators.required],
    sector:[null, Validators.required],
    dateOfEmployment:[null, Validators.required],
    salary:[null, Validators.required],
    heldPosition:[null, Validators.required],

  });


  hasUnitNumber = false;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }
}
