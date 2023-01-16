import { ReferenceI } from './../../../../models/references.model';
import { Component, Input, OnInit } from '@angular/core';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { CurriculumDataI } from 'src/app/models/curriculum.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { PersonService } from 'src/app/services/person.service';
import { Curriculum } from 'src/app/utils/reports/pdf';
import { Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { UserService } from 'src/app/services/user.service';
import * as dayjs from 'dayjs';
import { EducationI } from 'src/app/models/personEducation.model';
import { ExperienceI } from 'src/app/models/experience.model';
import { AuthorizationConfigurationFile } from 'src/app/models/authorizationConfiguration';

type TableRowFam = [string, string, string, string];
type TableRowPer = [string, string, string, string, string];
type TableRowEducation = [string, string, string, string, string, string, string];
type TableRowExperience = [string, string, string, string, string, string, string, string, string];

@Component({
  selector: 'app-curriculum-pdf',
  templateUrl: './curriculum-pdf.component.html',
  styleUrls: ['./curriculum-pdf.component.scss']
})

export class CurriculumPDFComponent implements OnInit {


  @Input()
  UUIDPerson: string;
  curriculum: CurriculumDataI | undefined;
  tableRefFam: ReferenceI[] = [];
  tableRefPer: ReferenceI[] = [];
  tableEducation: EducationI[] = [];
  tableExperience: ExperienceI[] = [];
  imageURL: string = 'https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/certify%2FFormato_Curriculum_Logo.png?alt=media&token=77b83778-621f-490a-bf0b-601ccc01339d'

  constructor(private personService: PersonService,
    private curriculumService: CurriculumService,
    private constancyService: AuthorizationService,
    private userService: UserService) { }

  ngOnInit() {
    this.loadExperience();
    this.loadCurriculum();
    this.loadEducation();
    this.loadRefFam();
    this.loadRefPer();
  }

  //TODO EMPIEZAN METODOS PARA CARGAR DE DATOS
  loadCurriculum() {
    let id_entrada = this.userService.userValue.uuidPerson;
    if (id_entrada) {
      this.curriculumService.GetCurriculum(id_entrada).subscribe(
        data => {
          this.curriculum = data['data'];
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

   //TODO TERMINAN METODOS PARA CARGAR DE DATOS

  async GenerateReportTable(refFam: ReferenceI[], refPer: ReferenceI[], education: EducationI[], experience: ExperienceI[]) {

    const pdf = new PdfMakeWrapper()

    pdf.pageSize('A4')
    pdf.pageMargins([62.5, 65, 62.5, 95])

    pdf.defaultStyle({
      fontSize: 12
    })

    pdf.add(await new Img(this.imageURL).alignment('center').width(200).height(100).relativePosition(0, -60).build())

    pdf.add(new Txt('Datos generales_____________________________________________').alignment('left').relativePosition(0, 40).color('#2778B4').fontSize(16).bold().end)

    pdf.add(new Txt('Nombre Completo').alignment('left').relativePosition(0, 60).bold().end)
    pdf.add(new Txt(this.curriculum.fullname).alignment('left').relativePosition(125, 60).end)

    pdf.add(new Txt('Dirección particular').alignment('left').relativePosition(0, 80).bold().end)
    pdf.add(new Txt(this.curriculum.direction).alignment('left').relativePosition(125, 80).end)

    pdf.add(new Txt('País').alignment('left').relativePosition(0, 100).bold().end)
    pdf.add(new Txt(this.curriculum.country).alignment('left').relativePosition(125, 100).end)
    pdf.add(new Txt('Municipio').alignment('left').relativePosition(238, 100).bold().end)
    pdf.add(new Txt(this.curriculum.municipality).alignment('left').relativePosition(360, 100).end)

    pdf.add(new Txt('Departamento').alignment('left').relativePosition(0, 120).bold().end)
    pdf.add(new Txt(this.curriculum.department).alignment('left').relativePosition(125, 120).end)
    pdf.add(new Txt('Aldea o caserío').alignment('left').relativePosition(238, 120).bold().end)
    pdf.add(new Txt(this.curriculum.village).alignment('left').relativePosition(360, 120).end)

    pdf.add(new Txt('Teléfono residencia').alignment('left').relativePosition(0, 140).bold().end)
    pdf.add(new Txt(this.curriculum.homephone).alignment('left').relativePosition(125, 140).end)
    pdf.add(new Txt('Teléfono oficina').alignment('left').relativePosition(238, 140).bold().end)
    pdf.add(new Txt(this.curriculum.workPhone).alignment('left').relativePosition(360, 140).end)

    pdf.add(new Txt('Teléfono celular').alignment('left').relativePosition(0, 160).bold().end)
    pdf.add(new Txt(this.curriculum.phone).alignment('left').relativePosition(125, 160).end)
    pdf.add(new Txt('Correo electrónico').alignment('left').relativePosition(238, 160).bold().end)
    pdf.add(new Txt(this.curriculum.email).alignment('left').relativePosition(360, 160).end)

    pdf.add(new Txt('Fecha de nacimiento').alignment('left').relativePosition(0, 180).bold().end)
    pdf.add(new Txt(this.curriculum.bornDate).alignment('left').relativePosition(125, 180).end)
    pdf.add(new Txt('Edad').alignment('left').relativePosition(238, 180).bold().end)
    pdf.add(new Txt(this.curriculum.age).alignment('left').relativePosition(360, 180).end)

    pdf.add(new Txt('Lugar nacimiento').alignment('left').relativePosition(0, 200).bold().end)
    pdf.add(new Txt(this.curriculum.bornPlace).alignment('left').relativePosition(125, 200).end)
    pdf.add(new Txt('Estado civil').alignment('left').relativePosition(238, 200).bold().end)
    pdf.add(new Txt(this.curriculum.civilStatus).alignment('left').relativePosition(360, 200).end)

    pdf.add(new Txt('Nacionalidad').alignment('left').relativePosition(0, 220).bold().end)
    pdf.add(new Txt(this.curriculum.nacionality).alignment('left').relativePosition(125, 220).end)
    pdf.add(new Txt('Etnia').alignment('left').relativePosition(238, 220).bold().end)
    pdf.add(new Txt(this.curriculum.etnia).alignment('left').relativePosition(360, 220).end)

    pdf.add(new Txt('Datos de identificación_______________________________________').alignment('left').relativePosition(0, 240).fontSize(16).color('#2778B4').bold().end)

    pdf.add(new Txt('CUI').alignment('left').relativePosition(0, 260).bold().end)
    pdf.add(new Txt(this.curriculum.dpi).alignment('left').relativePosition(125, 260).end)
    pdf.add(new Txt('No. pasaporte').alignment('left').relativePosition(238, 260).bold().end)
    pdf.add(new Txt(this.curriculum.passport).alignment('left').relativePosition(360, 260).end)

    pdf.add(new Txt('No. Afiliación IGSS').alignment('left').relativePosition(0, 280).bold().end)
    pdf.add(new Txt(this.curriculum.igss).alignment('left').relativePosition(125, 280).end)
    pdf.add(new Txt('Licencia').alignment('left').relativePosition(238, 280).bold().end)
    pdf.add(new Txt(this.curriculum.license).alignment('left').relativePosition(360, 280).end)

    pdf.add(new Txt('NIT').alignment('left').relativePosition(0, 300).bold().end)
    pdf.add(new Txt(this.curriculum.nit).alignment('left').relativePosition(125, 300).end)

    pdf.add(new Txt('Información familiar________________________________________').alignment('center').relativePosition(0, 370).fontSize(16).color('#2778B4').bold().end)
    pdf.add(this.createTableRefFam(refFam))

    pdf.add(new Txt('Educación__________________________________________________').alignment('center').relativePosition(0, 500).fontSize(16).color('#2778B4').bold().end)
    pdf.add(this.createTableEducation(education))

    pdf.add(new Txt('Referencias Personales_______________________________________').alignment('center').relativePosition(0, 10).fontSize(16).color('#2778B4').bold().pageBreak('before').end)
    pdf.add(this.createTableRefPer(refPer))

    pdf.add(new Txt('Experiencia Laboral_______________________________________').alignment('center').relativePosition(0, 140).fontSize(16).color('#2778B4').bold().end)
    pdf.add(this.createTableExperience(experience))
    pdf.create().open();
  }

  createTableRefFam(refFam: ReferenceI[]): ITable {
    return new Table([
      [ new Txt('Nombre').bold().color('white').alignment('center').end, new Txt('Teléfono').bold().color('white').alignment('center').end, new Txt('Parentesco').bold().color('white').alignment('center').end, new Txt('Fecha de nacimiento').bold().color('white').alignment('center').end],
      ...this.extractDataToRowFam(refFam)
    ])
    .relativePosition(0, 390)
    .widths(['*', 90, 90, 110])
      .layout({
        vLineColor: () => '#2778B4',
        hLineColor: () => '#2778B4',
        fillColor: (rowIndex) => {
          if (rowIndex === 0) {
            return '#2778B4';
          }
      }
      })
      .alignment('center')
      .end;
  }

  extractDataToRowFam(refPer: ReferenceI[]): TableRowFam[] {
    return refPer.map((row, index) => [row.name, row.phone, row.relationship, dayjs(row.bornDate).format('DD/MM/YYYY')])
  }

  createTableEducation(education: EducationI[]): ITable {
    return new Table([
      [
      new Txt('Pais').bold().color('white').alignment('center').end,
      new Txt('Establecimiento').bold().color('white').alignment('center').end,
      new Txt('Periodo del').bold().color('white').alignment('center').end,
      new Txt('Periodo al').bold().color('white').alignment('center').end,
      new Txt('Diploma').bold().color('white').alignment('center').end,
      new Txt('Estado').bold().color('white').alignment('center').end,
      new Txt('Grado').bold().color('white').alignment('center').end,
      ],
      ...this.extractDataToRowEducation(education)
    ])
    .relativePosition(0, 520)
    .widths([55,90,60,60,50,45,45])
      .layout({
        vLineColor: () => '#2778B4',
        hLineColor: () => '#2778B4',
        fillColor: (rowIndex) => {
          if (rowIndex === 0) {
            return '#2778B4';
          }
      }
      })
      .alignment('center')
      .end;
  }

  extractDataToRowEducation(education: EducationI[]): TableRowEducation[] {
    return education.map((row, index) => [row.country, row.establishment, dayjs(row.periodof).format('YYYY'), dayjs(row.periodto).format('YYYY'), row.certificate, row.status, row.grade])
  }


  createTableRefPer(refPer: ReferenceI[]): ITable {
    return new Table([
      [ new Txt('Nombre').bold().color('white').alignment('center').end, new Txt('Teléfono').bold().color('white').alignment('center').end, new Txt('Profesión').bold().color('white').alignment('center').end, new Txt('Empresa').bold().color('white').alignment('center').end, new Txt('Parentesco').bold().color('white').alignment('center').end],
      ...this.  extractDataToRowPer(refPer)
    ])
    .relativePosition(0, 30)
    .widths(['*','*','*','*','*'])
      .layout({
        vLineColor: () => '#2778B4',
        hLineColor: () => '#2778B4',
        fillColor: (rowIndex) => {
          if (rowIndex === 0) {
            return '#2778B4';
          }
      }
      })
      .alignment('center')
      .end;
  }

  extractDataToRowPer(refPer: ReferenceI[]): TableRowPer[] {
    return refPer.map((row, index) => [row.name, row.phone, row.profession, row.company, row.relationship])
  }


  createTableExperience(experience: ExperienceI[]): ITable {
    return new Table([
      [ new Txt('Dirección').bold().color('white').alignment('center').end,
       new Txt('Telefono').bold().color('white').alignment('center').end,
       new Txt('Motivo del Retiro').bold().color('white').alignment('center').end,
       new Txt('Fecha de Inicio').bold().color('white').alignment('center').end,
       new Txt('Fecha del Final').bold().color('white').alignment('center').end,
       new Txt('Puesto Desempeñado').bold().color('white').alignment('center').end,
       new Txt('Nombre del Jefe Inmediato').bold().color('white').alignment('center').end,
       new Txt('Sector').bold().color('white').alignment('center').end,
       new Txt('Salario').bold().color('white').alignment('center').end],
      ...this.extractDataToRowExperience(experience)
    ])
    .relativePosition(0, 160)
      .layout({
        vLineColor: () => '#2778B4',
        hLineColor: () => '#2778B4',
        fillColor: (rowIndex) => {
          if (rowIndex === 0) {
            return '#2778B4';
          }
      }
      })
      .alignment('center')
      .end;
  }

  extractDataToRowExperience(experience: ExperienceI[]): TableRowExperience[] {
    return experience.map((row, index) => [row.direction, row.phone, row.reason,  dayjs(row.dateof).format('YYYY'), dayjs(row.dateto).format('YYYY'), row.job, row.bossname, row.sector, row.salary])
  }


  /*PrintCurriculum(uuidPerson) {
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
  }*/
}
