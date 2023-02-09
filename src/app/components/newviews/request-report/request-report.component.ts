import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { RequestpermissionService } from 'src/app/services/request-permission.service';
import { UserService } from 'src/app/services/user.service';
import Sweet from 'sweetalert2';
import { FormatsDate } from '../../../../common/date-formats';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { IPermission } from 'src/app/models/permission';
import * as dayjs from 'dayjs';

interface estado {
  value: string;
  viewValue: string;
}
type TablePermission = [string, string, string, string, string];

@Component({
  templateUrl: './request-report.component.html',
  styleUrls: ['./request-report.component.scss']
})

export class RequestReportComponent implements OnInit {
  public p: number = 1;
  public tableSize: number = 20;

  public permissionreq: IPermission[];
  startDateInput: string
  endDateInput: string;
  estados: estado[] = [
    {value: 'En Espera', viewValue: 'En Espera'},
    {value: 'Aceptada', viewValue: 'Aceptada'},
    {value: 'Denegada', viewValue: 'Denegada'},
    {value: '', viewValue: 'Todas'},
  ];
  constructor(

    private userService: UserService,
    private _permission: RequestpermissionService,
  ) { }

  ngOnInit() {

  }


  getPermissions(startDate: string, endDate: string){
    this.startDateInput = startDate || this.startDateInput
    this.endDateInput = endDate || this.endDateInput
    if (!startDate || !endDate) {
      return
    }
    else {
      startDate = this.formatDate(startDate)
      endDate = this.formatDate(endDate)
    }

    this._permission.getAllRequestPermission(startDate, endDate).subscribe(
      response =>{
        this.permissionreq = response.data;

      } , err => console.log(err)
    )
  }

  formatDate(date): string {
    var emitteddate = new Date(date)
    return `${emitteddate.getFullYear()}-${emitteddate.getMonth() + 1}-${emitteddate.getDate()}`
  }

  GenerateReportTable(permissionRegistersForReport: IPermission[]) {
    console.log(permissionRegistersForReport)
    if (permissionRegistersForReport.length == 0) {
      Sweet.fire({
        icon: 'info',
        text: 'No existe ningún registro'
      });

      return;
    }

    const membrete = `Dirección de Área de Salud de Jalapa\n Departamento de Recursos Humanos\n Reporte de solicitudes de permiso\n`;
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
    pdf.add(this.createTablePermission(permissionRegistersForReport))
    pdf.create().open();
  }

  createTablePermission(RefPermission: IPermission[]): ITable {
    return new Table([
      [ new Txt('Emitido').bold().color('white').alignment('center').end, new Txt('Fecha de Permiso').bold().color('white').alignment('center').end, new Txt('Solicitante').bold().color('white').alignment('center').end, new Txt('Estado de Solicitud').bold().color('white').alignment('center').end],

    ])
    .relativePosition(0, 370)
    .widths(['*', 90, 90, 110])
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
      .end;
  }

  extractDataToPermission(RefPermission: IPermission[]): TablePermission[] {
    return RefPermission.map((row, index) => [`${index + 1}`, row.submittedAt, dayjs(row.permissionDate).format('DD/MM/YYYY'), row.status, row.status])
  }

}
