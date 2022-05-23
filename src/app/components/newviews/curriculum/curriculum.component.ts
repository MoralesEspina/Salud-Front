import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent {

  civilstatus: any[] = [
    'Soltero', 'Casado', 'Divorciado', 'Viudo'
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
    telephone:[null, Validators.required],
    ralationship:[null, Validators.required],
    establishment:[null, Validators.required],
    preiodof:[null, Validators.required],
    periodto:[null, Validators.required],
    diploma:[null, Validators.required],
    condition:[null, Validators.required],
    grade:[null, Validators.required],
    profession:[null, Validators.required],
    business:[null, Validators.required],
    phone:[null, Validators.required],
    schema:[null, Validators.required],
    relationship:[null, Validators.required],
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
