import { VacationrequestComponent } from './../../pdfs/vacationrequest/vacationrequest.component';
import { pdfFonts } from 'src/app/fonts/custom/times-new-roman.js';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Claims } from 'src/app/models/claims.model';
import { IPerson } from 'src/app/models/person.model';
import { RequestVacation } from 'src/app/models/requestVacation.models';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { RequestVacationService } from 'src/app/services/request-vacation.service';
import { UserService } from 'src/app/services/user.service';
import { VacationRequestPDF } from 'src/app/utils/reports/VacationRequest';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.scss']
})
export class RequestHistoryComponent implements OnInit {


  requestsVacation: RequestVacation[] = [];
  requestVacation: RequestVacation;
  user = new Claims();
  search: string;

  constructor(
    private requestVacationService: RequestVacationService,
    private configuration: AuthorizationService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
   }

  ngOnInit() {
    this.user = this.userService.userValue;
    this.GetRequestVacations();
  }

  GetRequestVacations() {
    this.requestVacationService.getRequestVacations()
      .subscribe(data => {
        this.requestsVacation = data['data']
      })
  }
}
