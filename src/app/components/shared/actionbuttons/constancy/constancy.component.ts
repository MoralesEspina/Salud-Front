import { Component, Input, OnInit } from '@angular/core';
import { IPerson } from 'src/app/models/person.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PersonService } from 'src/app/services/person.service';
import { Constancy } from 'src/app/utils/reports/Constancy';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-constancy',
  templateUrl: './constancy.component.html',
  styleUrls: ['./constancy.component.scss']
})
export class ConstancyComponent implements OnInit {
  @Input()
  IDPerson: string;

  constructor(private personService: PersonService,
    private constancyService: AuthorizationService) { }

  ngOnInit() {
  }
  PrintConstancy(uuidPerson) {
    Swal.fire({
      title: 'Desea Agregar el Salario',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, Agregar!'
    }).then((result) => {
      if (result.isConfirmed) {
        environment.viewSalary=true
        this.personService.OnePerson(uuidPerson)
        .subscribe(async data => {
          let person = new IPerson();
          person = data['data']
          this.constancyService.GetConfigurationFile('constancy')
            .subscribe(async configuration => {
              await Constancy(person, configuration['data']).then(
                pdf => {
                  pdf.create().print()
                }
              )
            }, async err => {
              console.log(err)
              await Constancy(person, null).then(
                pdf => {
                  pdf.create().print()
                }
              )
            })

        })
      }else{
        environment.viewSalary=false
        this.personService.OnePerson(uuidPerson)
        .subscribe(async data => {
          let person = new IPerson();
          person = data['data']
          this.constancyService.GetConfigurationFile('constancy')
            .subscribe(async configuration => {
              await Constancy(person, configuration['data']).then(
                pdf => {
                  pdf.create().print()
                }
              )
            }, async err => {
              console.log(err)
              await Constancy(person, null).then(
                pdf => {
                  pdf.create().print()
                }
              )
            })

        })
      }
    })


  }



}
