import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { IAuthorization } from 'src/app/models/authorization';
import { Claims } from 'src/app/models/claims.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';
import { CreatePDFVacationAuthorization } from 'src/app/utils/reports/VacationAuthorization';
import Swal from 'sweetalert2';
import pdfFonts from '../../fonts/custom/times-new-roman';
import { EditauuthorizationComponent } from '../partials/editauuthorization/editauuthorization.component';

PdfMakeWrapper.setFonts(pdfFonts, {
  times: {
    normal: 'times.ttf',
    bold: 'times-bold.ttf',
    italics: 'georgia-italic.ttf',
    bolditalics: 'georgia-italic.ttf'
  }
})

PdfMakeWrapper.useFont('times')
@Component({
  selector: 'app-gridauthorizations',
  templateUrl: './gridauthorizations.component.html',
  styleUrls: ['./gridauthorizations.component.scss']
})
export class GridauthorizationsComponent implements OnInit {
  displayedColumns: string[] = ['register', 'dateemmited', 'fullname', 'cui', 'ACCIONES'];
  authorizations: IAuthorization[] = []
  authorizationPDF = new IAuthorization();
  user = new Claims();
  public p:number = 1;
  public tableSize:number = 25;
  search: string;

  dataSource: { filter: string; };

  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (typeof event['key'] == 'number') {
      filterValue.trim().toLowerCase();
    }
    this.dataSource.filter = filterValue
  }
  constructor(
    private authorizationService: AuthorizationService,
    private userService: UserService,
    private dialog: MatDialog) {
    this.manyAuthorization();
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.user = this.userService.userValue;
    this.manyAuthorization();

    // this.search.valueChanges.subscribe(value => {
    //   this.authorizations.filter(character => character.person.fullname === value)
    // })
  }

  manyAuthorization() {
    this.authorizationService.ManyAuthorization()
      .subscribe(data => {
        this.authorizations = data['data']
        // this.dataSource = new MatTableDataSource(this.authorization);
      }, err => console.log(err))
  }

  updateOne(uuid) {

    this.authorizationService.OneAuthorization(uuid)
      .subscribe(data => {
        const modalDialog = this.dialog.open(EditauuthorizationComponent, {
          disableClose: true,
          autoFocus: true,
          width: '800px',
          height: '892px',
          data: {
            person: data['data']
          }
        })

        modalDialog.afterClosed()
          .subscribe(result => {
            if (result) {
              this.authorizationService.UpdateAuthorization(result, uuid)
                .subscribe(ok => {
                  this.manyAuthorization();
                  Swal.fire({
                    icon: 'success',
                    title: '<span class="text-gray-900"> Actualizado correctamente </span>',
                    toast: true,
                    showConfirmButton: false,
                    position: 'top-end',
                    timer: 1500,
                  });

                }, err => console.log(err))
            }
          })
      }, err => console.log(err))
  }


  printPDF(uuid) {
    this.authorizationService.printPDF(uuid)
      .subscribe(data => {
        this.authorizationService.GetConfigurationFile('authorization')
          .subscribe(dataConf => {
            CreatePDFVacationAuthorization(data['data'], null, dataConf['data'])
              .then(pdf => {
                pdf.create().print();
              })
          }, err => {
            console.log(err)
            CreatePDFVacationAuthorization(data['data'], null, null)
              .then(pdf => {
                pdf.create().print();
              })
          })
      }, err => console.log(err))
  }


}

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, fieldName: string): any[] {

    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!searchText) { return items; }

    // convert the searchText to lower case
    searchText = searchText.toLowerCase();

    // retrun the filtered array
    return items.filter(item => {
      if (item && item[fieldName].fullname) {
        return item[fieldName].fullname.toLowerCase().includes(searchText);
      }
      return false;
    });
  }
}
