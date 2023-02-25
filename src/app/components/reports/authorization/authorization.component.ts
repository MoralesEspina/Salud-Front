import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { IAuthorization } from 'src/app/models/authorization';
import { ReportsService } from 'src/app/services/reports.service';
import Sweet from 'sweetalert2';
import { FormatsDate } from '../../../../common/date-formats';



type TableRow = [string, string, string, string, string, string];

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})


export class AuthorizationComponent implements OnInit {
  startDateInput: string
  endDateInput: string
  order: string // asc o desc
  orderField: string
  public p:number = 1;
  public tableSize:number = 25;
  authorizations: IAuthorization[] = []

  constructor(private reportService: ReportsService) { }

  ngOnInit() {
    // this.authorizationReport()
  }

  authorizationReport(startDate: string, endDate: string) {
    this.startDateInput = startDate || this.startDateInput
    this.endDateInput = endDate || this.endDateInput

    if (!startDate || !endDate) {
      return
    }
    else {
      startDate = this.formatDate(startDate)
      endDate = this.formatDate(endDate)
    }

    this.reportService.authorizationReportGenerate(startDate, endDate)
      .subscribe(data => {
        this.authorizations = data['data']
      }, err => console.log(err))
  }


  orderReport(order: string, orderField: string) {
    this.order = order || this.order
    this.orderField = orderField || this.orderField


    if (!this.order || !this.orderField) { return }


    if (this.order == 'asc') {

      switch (this.orderField) {
        case 'person.fullname':
          this.authorizations.sort((a, b) => a.person[`${this.orderField.split('.')[1]}`].localeCompare(b.person[`${this.orderField.split('.')[1]}`]));
          break;
        case 'person.work_dependency.name':
          this.authorizations.sort((a, b) => a.person.work_dependency[`${this.orderField.split('.')[2]}`].localeCompare(b.person.work_dependency[`${this.orderField.split('.')[2]}`]))
          break;
        default:
          this.authorizations.sort((a, b) => a[`${this.orderField}`].localeCompare(b[`${this.orderField}`]))
          break;
      }
    }
    else {
      switch (this.orderField) {
        case 'person.fullname':
          this.authorizations.sort((a, b) => b.person[`${this.orderField.split('.')[1]}`].localeCompare(a.person[`${this.orderField.split('.')[1]}`]))
          break;
        case 'person.work_dependency.name':
          this.authorizations.sort((a, b) => b.person.work_dependency[`${this.orderField.split('.')[2]}`].localeCompare(a.person.work_dependency[`${this.orderField.split('.')[2]}`]))
          break;
        default:
          this.authorizations.sort((a, b) => b[`${this.orderField}`].localeCompare(a[`${this.orderField}`]))
          break;
      }
    }
  }


  formatDate(date): string {
    var emitteddate = new Date(date)
    return `${emitteddate.getFullYear()}-${emitteddate.getMonth() + 1}-${emitteddate.getDate()}`
  }

  GenerateReportTable(authorizationRegistersForReport: IAuthorization[]) {
    if (authorizationRegistersForReport.length == 0) {
      Sweet.fire({
        icon: 'info',
        text: 'No existe ningún registro'
      });

      return;
    }

    const membrete = `Dirección de Área de Salud de Jalapa\n Sección de Recursos Humanos\n Reporte de personal que estuvo de vacaciones\n`;
    var startDate = FormatsDate.DateToWordObject(this.startDateInput)
    var endDate = FormatsDate.DateToWordObject(this.endDateInput)

    const datesOfEmitted = `Del ${startDate['day']} de ${startDate['month']} al ${endDate['day']} de ${endDate['month']} de ${startDate['year']}\n\n`
    const pdf = new PdfMakeWrapper()
    pdf.pageSize('A4')
    pdf.pageOrientation('landscape')
    pdf.pageMargins([40, 40, 40, 91])

    pdf.defaultStyle({
      fontSize: 12
    })


    pdf.add(new Txt(membrete).alignment('center').fontSize(14).bold().end)
    pdf.add(new Txt(datesOfEmitted).alignment('center').fontSize(14).bold().end)
    pdf.add(this.createTable(authorizationRegistersForReport))
    pdf.create().open();
  }

  createTable(authorizations: IAuthorization[]): ITable {
    return new Table([
      [ new Txt('No.').bold().alignment('center').end, new Txt('Nombre del empleado').bold().alignment('center').end, new Txt('Dependencia donde labora').bold().alignment('center').end, new Txt('Inicio').bold().alignment('center').end, new Txt('Fin').bold().alignment('center').end, new Txt('Reanudación').bold().alignment('center').end],
      ...this.extractDataToRow(authorizations)
    ])
      .layout({
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#ABE6FA' : '';
        }
      })
      .alignment('center')
      .end;
  }


  extractDataToRow(authorizations: IAuthorization[]): TableRow[] {
    return authorizations.map((row, index) => [`${index + 1}`, this.Title(row.person.fullname.replace(/^(\s*)|(\s*)$/g, '').replace(/\s+/g, ' ')), row.person.work_dependency.name, dayjs(row.startdate).format('DD/MM/YYYY'), dayjs(row.enddate).format('DD/MM/YYYY'), dayjs(row.resumework).format('DD/MM/YYYY')])
  }

  Title(val) {
    return val.toLowerCase()
      .trim()
      .split(' ')
      .map(v => v[0].toUpperCase() + v.substr(1))
      .join(' ');
  }

  Capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

}
