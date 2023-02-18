import { ReferenceI } from '../../../models/references.model';
import { Component, Input, OnInit } from '@angular/core';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { CurriculumDataI } from 'src/app/models/curriculum.model';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { Cell, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { UserService } from 'src/app/services/user.service';
import * as dayjs from 'dayjs';
import { EducationI } from 'src/app/models/personEducation.model';
import { ExperienceI } from 'src/app/models/experience.model';
import { LocalService } from 'src/app/services/local.service';

type TableRowFam = [string, string, string, string];
type TableRowPer = [string, string, string, string, string];
type TableRowEducation = [string, string, string, string, string, string, string];

@Component({
  selector: 'app-curriculum-pdf',
  templateUrl: './curriculum-pdf.component.html',
  styleUrls: ['./curriculum-pdf.component.scss']
})

export class CurriculumPDFComponent implements OnInit {

  @Input()
  UUIDPerson: string;
  curriculum: CurriculumDataI | undefined;
  refFam: ReferenceI[];
  refPer: ReferenceI[];
  education: EducationI[];
  tableExperience: ExperienceI[] = [];
  fecha = new Date();
  imageURL: string = 'https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/avatars%2F022405c2-9fdb-4caa-ba22-b2d3a93cbc0c.jpg?alt=media&token=931728a3-f91b-4d7d-9df9-1f0dd67b1712'
  urlImage: string;

  constructor(
    private curriculumService: CurriculumService,
    private userService: UserService,
    private localService: LocalService) { }

  ngOnInit() {

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
          this.education = data['data'];
        }
      )
    }
  }

  loadRefFam() {
    let id_entrada = this.userService.userValue.uuidPerson;
    if (id_entrada) {
      this.curriculumService.GetRefFam(id_entrada).subscribe(
        data => {
          this.refFam = data['data'];
        }
      )
    }
  }

  loadRefPer() {
    let id_entrada = this.userService.userValue.uuidPerson;
    if (id_entrada) {
      this.curriculumService.GetRefPer(id_entrada).subscribe(
        data => {
          this.refPer = data['data'];
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

  async GenerateReportTable() {

    this.loadExperience();
    this.loadCurriculum();
    this.loadEducation();
    this.loadRefFam();
    this.loadRefPer();
    this. urlImage = this.localService.getJsonValue('avatar');
    const pdf = new PdfMakeWrapper()

    pdf.pageSize('Legal')
    pdf.pageMargins([62.5, 65, 62.5, 100])

    pdf.defaultStyle({
      fontSize: 10
    })

    pdf.add(await new Img(this.imageURL).alignment('center').width(100).height(75).relativePosition(0, -60).build())

    pdf.add(await new Img(this.urlImage).alignment('right').width(100).height(100).relativePosition(0, -50).build())

    pdf.add(new Txt('Dirección de Área de Salud de Jalapa').alignment('center').relativePosition(0, 20).color('#2A3C91').fontSize(12).bold().end)
    pdf.add(new Txt('Departamento de Recursos Humanos').alignment('center').relativePosition(0, 35).color('#2A3C91').fontSize(12).bold().end)
    pdf.add(new Txt('Datos generales___________________________________________________________________').alignment('left').relativePosition(0, 60).color('#2778B4').fontSize(12).bold().end)

    pdf.add(new Txt('Nombre Completo').alignment('left').relativePosition(0, 90).bold().end)
    pdf.add(new Txt(this.curriculum.fullname).alignment('left').relativePosition(110, 90).end)

    pdf.add(new Txt('Dirección particular').alignment('left').relativePosition(0, 110).bold().end)
    pdf.add(new Txt(this.curriculum.direction).alignment('left').relativePosition(110, 110).end)

    pdf.add(new Txt('País').alignment('left').relativePosition(0, 130).bold().end)
    pdf.add(new Txt(this.curriculum.country).alignment('left').relativePosition(110, 130).end)
    pdf.add(new Txt('Municipio').alignment('left').relativePosition(245, 130).bold().end)
    pdf.add(new Txt(this.curriculum.municipality).alignment('left').relativePosition(340, 130).end)

    pdf.add(new Txt('Departamento').alignment('left').relativePosition(0, 150).bold().end)
    pdf.add(new Txt(this.curriculum.department).alignment('left').relativePosition(110, 150).end)
    pdf.add(new Txt('Aldea o caserío').alignment('left').relativePosition(245, 150).bold().end)
    pdf.add(new Txt(this.curriculum.village).alignment('left').relativePosition(340, 150).end)

    pdf.add(new Txt('Teléfono residencia').alignment('left').relativePosition(0, 170).bold().end)
    pdf.add(new Txt(this.curriculum.homephone).alignment('left').relativePosition(110, 170).end)
    pdf.add(new Txt('Teléfono oficina').alignment('left').relativePosition(245, 170).bold().end)
    pdf.add(new Txt(this.curriculum.workPhone).alignment('left').relativePosition(340, 170).end)

    pdf.add(new Txt('Teléfono celular').alignment('left').relativePosition(0, 190).bold().end)
    pdf.add(new Txt(this.curriculum.phone).alignment('left').relativePosition(110, 190).end)
    pdf.add(new Txt('Correo electrónico').alignment('left').relativePosition(245, 190).bold().end)
    pdf.add(new Txt(this.curriculum.email).alignment('left').relativePosition(340, 190).end)

    pdf.add(new Txt('Fecha de nacimiento').alignment('left').relativePosition(0, 210).bold().end)
    pdf.add(new Txt(this.curriculum.bornDate).alignment('left').relativePosition(110, 210).end)
    pdf.add(new Txt('Edad').alignment('left').relativePosition(245, 210).bold().end)
    pdf.add(new Txt(this.curriculum.age).alignment('left').relativePosition(340, 210).end)

    pdf.add(new Txt('Lugar nacimiento').alignment('left').relativePosition(0, 230).bold().end)
    pdf.add(new Txt(this.curriculum.bornPlace).alignment('left').relativePosition(110, 230).end)
    pdf.add(new Txt('Estado civil').alignment('left').relativePosition(245, 230).bold().end)
    pdf.add(new Txt(this.curriculum.civilStatus).alignment('left').relativePosition(340, 230).end)

    pdf.add(new Txt('Nacionalidad').alignment('left').relativePosition(0, 250).bold().end)
    pdf.add(new Txt(this.curriculum.nacionality).alignment('left').relativePosition(110, 250).end)
    pdf.add(new Txt('Etnia').alignment('left').relativePosition(245, 250).bold().end)
    pdf.add(new Txt(this.curriculum.etnia).alignment('left').relativePosition(340, 250).end)

    pdf.add(new Txt('Datos de identificación_____________________________________________________________').alignment('left').relativePosition(0, 280).fontSize(12).color('#2778B4').bold().end)

    pdf.add(new Txt('CUI').alignment('left').relativePosition(0, 310).bold().end)
    pdf.add(new Txt(this.curriculum.dpi).alignment('left').relativePosition(110, 310).end)
    pdf.add(new Txt('No. pasaporte').alignment('left').relativePosition(245, 310).bold().end)
    pdf.add(new Txt(this.curriculum.passport).alignment('left').relativePosition(340, 310).end)

    pdf.add(new Txt('No. Afiliación IGSS').alignment('left').relativePosition(0, 330).bold().end)
    pdf.add(new Txt(this.curriculum.igss).alignment('left').relativePosition(110, 330).end)
    pdf.add(new Txt('Licencia').alignment('left').relativePosition(245, 330).bold().end)
    pdf.add(new Txt(this.curriculum.license).alignment('left').relativePosition(340, 330).end)

    pdf.add(new Txt('NIT').alignment('left').relativePosition(0, 350).bold().end)
    pdf.add(new Txt(this.curriculum.nit).alignment('left').relativePosition(110, 350).end)

    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)


    pdf.add(new Txt('Información familiar_______________________________________________________________').alignment('left').fontSize(12).color('#2778B4').bold().end)
    pdf.add(new Txt(' ').end)
    pdf.add(this.createTableRefFam(this.refFam))
    pdf.add(new Txt(' ').end)

    pdf.add(new Txt('Educación________________________________________________________________________').alignment('left').fontSize(12).color('#2778B4').bold().end)
    pdf.add(new Txt(' ').end)
    pdf.add(this.createTableEducation(this.education))
    pdf.add(new Txt(' ').end)

    pdf.add(new Txt('Referencias Personales_____________________________________________________________').alignment('left').fontSize(12).color('#2778B4').bold().end)
    pdf.add(new Txt(' ').end)
    pdf.add(this.createTableRefPer(this.refPer))
    pdf.add(new Txt(' ').end)

    pdf.add(new Txt('Experiencia Laboral_______________________________________________________________').alignment('left').fontSize(12).color('#2778B4').bold().end)
    pdf.add(new Txt(' ').end)
    this.tableExperience.forEach(element => {
      pdf.add(new Table([
        [new Cell(new Txt('Nombre de la institución o empresa: ' + element.company).end).colSpan(4).color('white').fontSize(9).end, null, null, null],
        [new Cell(new Txt('Dirección: ' + element.direction).end).colSpan(4).fontSize(9).end, null, null, null],
        [new Cell(new Txt('Telefono: ' + element.phone).end).colSpan(2).fontSize(9).end, null, new Cell(new Txt('Nombre jefe inmediato: ' + element.bossname).end).colSpan(2).fontSize(9).end,null],
        [new Cell(new Txt('Motivo del retiro: ' + element.reason).end).colSpan(2).fontSize(9).end, null, new Cell(new Txt('Sector: ' + element.sector).end).colSpan(2).fontSize(9).end,null],
        [new Cell(new Txt('Fecha del empleo: ' + element.dateof + ' al ' + element.dateto).end).colSpan(2).fontSize(9).end, null, new Cell(new Txt('Salario: Q.' + element.salary).end).colSpan(2).fontSize(9).end,null],
        [new Cell(new Txt('Puesto desempeñado: ' + element.job).end).colSpan(4).fontSize(9).end, null, null, null],
    ]).layout({
      vLineColor: () => '#3A66A0',
      hLineColor: () => '#3A66A0',
      fillColor: (rowIndex) => {
        if (rowIndex === 0) {
          return '#3A66A0';
        }
    }
    })
    .widths("*")
    .end)
    pdf.add(new Txt(' ').end)
    });

    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt(' ').end)
    pdf.add(new Txt('_________________________________________').alignment('center').fontSize(10).bold().end)
    pdf.add(new Txt('F. '+this.curriculum.fullname).alignment('center').fontSize(10).bold().end)
    pdf.add(new Txt('Fecha de generación: '+ this.fecha.toLocaleDateString()).alignment('center').fontSize(10).bold().end)
    pdf.create().open();
  }

  createTableRefFam(refFam: ReferenceI[]): ITable {
    return new Table([
      [ new Txt('Nombre').bold().color('white').alignment('center').fontSize(10).end, new Txt('Teléfono').bold().color('white').alignment('center').fontSize(10).end, new Txt('Parentesco').bold().color('white').alignment('center').fontSize(10).end, new Txt('Fecha de nacimiento').bold().color('white').alignment('center').fontSize(10).end],
      ...this.extractDataToRowFam(refFam)
    ])
    .widths([112, 112, 112, 112])
      .layout({
        vLineColor: () => '#3A66A0',
        hLineColor: () => '#3A66A0',
        fillColor: (rowIndex) => {
          if (rowIndex === 0) {
            return '#3A66A0';
          }
        }
      })
      .alignment('center')
      .fontSize(9)
      .end;
  }

  extractDataToRowFam(refFam: ReferenceI[]): TableRowFam[] {
    return refFam.map((row, index) => [row.name, row.phone, row.relationship, dayjs(row.bornDate).format('DD/MM/YYYY')])
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
    .widths([50,93,50,50,64,50,64])
      .layout({
        vLineColor: () => '#3A66A0',
        hLineColor: () => '#3A66A0',
        fillColor: (rowIndex) => {
          if (rowIndex === 0) {
            return '#3A66A0';
          }
      }
      })
      .fontSize(9)
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
    .widths([88,88,88,88,88])
      .layout({
        vLineColor: () => '#3A66A0',
        hLineColor: () => '#3A66A0',
        fillColor: (rowIndex) => {
          if (rowIndex === 0) {
            return '#3A66A0';
          }
      }
      })
      .fontSize(9)
      .alignment('center')
      .end;
  }

  extractDataToRowPer(refPer: ReferenceI[]): TableRowPer[] {
    return refPer.map((row, index) => [row.name, row.phone, row.profession, row.company, row.relationship])
  }
}
