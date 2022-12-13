import { ReferenceI } from './../../../../models/references.model';
import { Component, Input, OnInit } from '@angular/core';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { CurriculumDataI } from 'src/app/models/curriculum.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { PersonService } from 'src/app/services/person.service';
import { Curriculum } from 'src/app/utils/reports/pdf';

@Component({
  selector: 'app-curriculum-pdf',
  templateUrl: './curriculum-pdf.component.html',
  styleUrls: ['./curriculum-pdf.component.scss']
})

export class CurriculumPDFComponent implements OnInit {


  @Input()
  UUIDPerson: string;

  constructor(private personService: PersonService,
    private curriculumService: CurriculumService,
    private constancyService: AuthorizationService) { }

  ngOnInit() {
  }


  PrintCurriculum(uuidPerson) {
    this.curriculumService.GetCurriculum(uuidPerson)
      .subscribe(async data => {
        let curriculum = new CurriculumDataI();
        curriculum = data['data']
        this.curriculumService.GetRefFam(uuidPerson)
          .subscribe(async data => {
            let fam = new ReferenceI();
            fam = data['data']
            console.log(fam)
            this.constancyService.GetConfigurationFile('constancy')
              .subscribe(async configuration => {
                await Curriculum(curriculum, fam, configuration['data']).then(
                  pdf => {
                    pdf.create().print()
                  }
                )
              }, async err => {
                console.log(err)
                await Curriculum(curriculum, fam, null).then(
                  pdf => {
                    pdf.create().print()
                  }
                )
              })
          })
      })
  }
}
