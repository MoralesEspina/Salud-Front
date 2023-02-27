import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { RequestpermissionService } from 'src/app/services/request-permission.service';
import { UserService } from 'src/app/services/user.service';
import Sweet from 'sweetalert2';
import { FormatsDate } from '../../../../common/date-formats';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { IPermission } from 'src/app/models/permission';
import * as dayjs from 'dayjs';
import { PersonService } from 'src/app/services/person.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { IPerson } from 'src/app/models/person.model';
import { Permission } from 'src/app/utils/reports/Permission';
import { Claims } from 'src/app/models/claims.model';

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

  public permissionreq: IPermission[] = [];
  startDateInput: string
  endDateInput: string;
  statusInput: string;
  estados: estado[] = [
    {value: 'En Espera', viewValue: 'En Espera'},
    {value: 'Aceptada', viewValue: 'Aceptada'},
    {value: 'Denegada', viewValue: 'Denegada'},
    {value: 'Todas', viewValue: 'Todas'},
  ];

  user: Claims = new Claims()

  constructor(
    private _permission: RequestpermissionService,
    private personService: PersonService,
    private constancyService: AuthorizationService,
    private authService: UserService,
  ) { }

  ngOnInit() {
    this.user.rol = this.authService.userValue.rol;
  }

  getPermissions(startDate: string, endDate: string, status: string){
    let id_entrada = this.authService.userValue.uuidPerson;
    this.startDateInput = startDate || this.startDateInput
    this.endDateInput = endDate || this.endDateInput
    this.statusInput = status || this.statusInput
    if (!startDate || !endDate) {
      return
    }
    else {
      startDate = this.formatDate(startDate)
      endDate = this.formatDate(endDate)
    }

    this._permission.getAllRequestPermission(startDate, endDate, status, id_entrada).subscribe(
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
    if (permissionRegistersForReport.length == 0) {
      Sweet.fire({
        icon: 'info',
        text: 'No existe ningún registro'
      });

      return;
    }

    const membrete = `Dirección de Área de Salud de Jalapa\n Sección de Recursos Humanos\n Reporte de Solicitudes de Ausencias\n`;
    var startDate = FormatsDate.DateToWordObject(this.startDateInput)
    var endDate = FormatsDate.DateToWordObject(this.endDateInput)

    const datesOfEmitted = `Del ${startDate['day']} de ${startDate['month']} al ${endDate['day']} de ${endDate['month']} de ${startDate['year']}\n\n`
    const pdf = new PdfMakeWrapper()
    pdf.pageSize('Letter')
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

  createTablePermission(permissions: IPermission[]): ITable {
    return new Table([
      [new Txt('No').bold().color('white').alignment('center').end, new Txt('Emitido').bold().color('white').alignment('center').end, new Txt('Fecha de Permiso').bold().color('white').alignment('center').end, new Txt('Solicitante').bold().color('white').alignment('center').end, new Txt('Estado de Solicitud').bold().color('white').alignment('center').end],
      ...this.extractDataToPermission(permissions)
    ])
    .widths([20, 100, 100, 350, 100])
      .layout({
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#ABE6FA' : '';
        }
      })
      .alignment('center')
      .end;
  }

  extractDataToPermission(permissions: IPermission[]): TablePermission[] {
    return permissions.map((row, index) => [`${index + 1}`, dayjs(row.submittedAt).locale("es").format('DD/MMMM/YYYY'), dayjs(row.permissionDate).locale("es").format('DD/MMMM/YYYY'), row.fullname, row.status])
  }

  PrintPermission(uuidPerson, uuidPermission) {
    this.personService.OnePerson(uuidPerson)
      .subscribe(async data => {
        let person = new IPerson();
        person = data['data']
        this._permission.getOneRequestPermissionWithName(uuidPermission)
          .subscribe(async data => {
            let permission = new IPermission('','','','','','','','','','','','');
            permission = data['data']
            this.constancyService.GetConfigurationFile('constancy')
              .subscribe(async configuration => {
                await Permission(person, permission).then(
                  pdf => {
                    pdf.create().print()
                  }
                )
              }, async err => {
                console.log(err)
                await Permission(person,permission).then(
                  pdf => {
                    pdf.create().print()
                  }
                )
              })
          })
      })
  }
}

