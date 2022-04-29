import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {
  idPerson: string;
  name: string;
  exist: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private personService: PersonService) { }

  ngOnInit() {
    this.idPerson = this.route.snapshot.paramMap.get('idPerson');
    this.personService.ValidationCertify(this.idPerson)
      .subscribe(
        data => {
          this.name = data['data'];
          this.exist = true;
        },
        err => {
          this.exist = false;
          console.log(err)
        }
      )
  }


}
