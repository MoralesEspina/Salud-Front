import { PrincipalComponent } from './components/newviews/principal/principal.component';
import { A11yModule } from '@angular/cdk/a11y';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDatepickerModule, MatPaginatorModule, MatSidenavModule, MatSlideToggleModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CertificationComponent } from './components/certification/certification.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilterPipe, GridauthorizationsComponent } from './components/gridauthorizations/gridauthorizations.component';
import { GridrequestvacationComponent } from './components/gridrequestvacation/gridrequestvacation.component';
import { JobdependencyComponent } from './components/jobdependency/jobdependency.component';
import { LoginComponent } from './components/login/login.component';
import { PersonComponent } from './components/maintenances/person/person.component';
import { ConfigurationauthorizationfileComponent } from './components/partials/configurationauthorizationfile/configurationauthorizationfile.component';
import { DocumentComponent } from './components/partials/document/document.component';
import { EditauuthorizationComponent } from './components/partials/editauuthorization/editauuthorization.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { NotfoundComponent } from './components/partials/notfound/notfound.component';
import { PersonmodalComponent } from './components/partials/personmodal/personmodal.component';
import { UploadavatarComponent } from './components/partials/uploadavatar/uploadavatar.component';
import { WorkComponent } from './components/partials/work/work.component';
import { DisabledDirective, VacationrequestComponent } from './components/pdfs/vacationrequest/vacationrequest.component';
import { AuthorizationComponent } from './components/reports/authorization/authorization.component';
import { PersonGridComponent } from './components/reports/person-grid/person-grid.component';
import { ConstancyComponent } from './components/shared/actionbuttons/constancy/constancy.component';
import { AuthorizationConfigurationComponent } from './components/shared/authorization-configuration/authorization-configuration.component';
import { DependenciesComponent } from './components/shared/render/dependencies/dependencies.component';
import { EspecialitiesComponent } from './components/shared/render/especialities/especialities.component';
import { JobsComponent } from './components/shared/render/jobs/jobs.component';
import { UsersComponent } from './components/users/users.component';
import { Jwtheader } from './guards/jwtheader.interceptor';
import { Statuserror } from './guards/statuserror.interceptor';
import { RequestsComponent } from './components/newviews/requests/requests.component';
import { MatSortModule } from '@angular/material/sort';
import { CurriculumComponent } from './components/newviews/curriculum/curriculum.component';
import { MatRadioModule } from '@angular/material/radio';
import { HistoryComponent } from './components/newviews/history/history.component';
import { UsermodalComponent } from './components/partials/usermodal/usermodal.component';
import { PermissionauthComponent } from './components/newviews/permissionauth/permissionauth.component';
import { PermissionComponent } from './components/partials/permission/permission.component';

import { PermissionrequestComponent } from './components/pdfs/permissionrequest/permissionrequest.component';

import { CurriculumPDFComponent } from './components/shared/actionbuttons/curriculum-pdf/curriculum-pdf.component';
import { RequestHistoryComponent } from './components/newviews/request-history/request-history.component';
import { PermissionReqComponent } from './components/newviews/permission/permissionreq.component';



@NgModule({
  exports: [
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    DocumentComponent,
    PersonmodalComponent,
    WorkComponent,
    GridauthorizationsComponent,
    EditauuthorizationComponent,
    UsersComponent,
    JobdependencyComponent,
    JobsComponent,
    DependenciesComponent,
    AuthorizationComponent,
    VacationrequestComponent,
    DisabledDirective,
    PersonComponent,
    GridrequestvacationComponent,
    PersonGridComponent,

    FilterPipe,

    UploadavatarComponent,

    ConfigurationauthorizationfileComponent,

    AuthorizationConfigurationComponent,

    EspecialitiesComponent,

    CertificationComponent,

    NotfoundComponent,

    ConstancyComponent,

    RequestsComponent,

    HistoryComponent,

    CurriculumComponent,

    UsermodalComponent,

    PermissionauthComponent,

    PermissionComponent,

    PrincipalComponent,


    PermissionrequestComponent,

    CurriculumPDFComponent,

    RequestHistoryComponent,
    PermissionReqComponent,

  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,

    MatDatepickerModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    A11yModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMatSelectSearchModule,
    MatCheckboxModule,

    AppRoutingModule,

    MatSortModule,

    MatSortModule,

    MatRadioModule,

  ],
  entryComponents: [
    DocumentComponent,
    PersonmodalComponent,
    WorkComponent,
    EditauuthorizationComponent,
    VacationrequestComponent,
    UploadavatarComponent,
    ConstancyComponent,
    CurriculumPDFComponent,
    UsermodalComponent,
    PermissionReqComponent,
    PermissionrequestComponent,
    ConfigurationauthorizationfileComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: Statuserror, multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: Jwtheader, multi: true,
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    },

  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
