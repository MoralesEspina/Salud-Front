import { PrincipalComponent } from './components/newviews/principal/principal.component';
import { CurriculumComponent } from './components/newviews/curriculum/curriculum.component';

import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { CertificationComponent } from './components/certification/certification.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GridauthorizationsComponent } from './components/gridauthorizations/gridauthorizations.component';
import { GridrequestvacationComponent } from './components/gridrequestvacation/gridrequestvacation.component';
import { JobdependencyComponent } from './components/jobdependency/jobdependency.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/partials/notfound/notfound.component';
import { AuthorizationComponent } from './components/reports/authorization/authorization.component';
import { PersonGridComponent } from './components/reports/person-grid/person-grid.component';
import { UsersComponent } from './components/users/users.component';
import { RequestsComponent } from './components/newviews/requests/requests.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/rols.model';
import { HistoryComponent } from './components/newviews/history/history.component';
import { PermissionauthComponent } from './components/newviews/permissionauth/permissionauth.component';
import { RequestHistoryComponent } from './components/newviews/request-history/request-history.component';
import { PermissionComponent } from './components/partials/permission/permission.component';
import { PermissionReqComponent } from './components/newviews/permission/permissionreq.component';


const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  scrollPositionRestoration: 'enabled'
}

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reportes',
    component: AuthorizationComponent ,
    canActivate: [AuthGuard],
    data: {roles: [Role.admin]}
  },
  {
    path: 'requests',
    component: RequestsComponent ,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "registros",
    component: GridauthorizationsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.admin]}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'usuarios',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.admin]}
  },
  {
    path: 'dependency',
    component: JobdependencyComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'historial',
    component: HistoryComponent

  },
  {
    path: 'historial_solicitudes',
    component: RequestHistoryComponent

  },

  {
    path: 'solicitudes',
    component: GridrequestvacationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'constancia/:idPerson',
    component: CertificationComponent,
  },
  {
    path: 'personas',
    component: PersonGridComponent
  },
  {
    path: 'curriculum',
    component: CurriculumComponent
  },
  {
    path: 'permisos',
    component: PermissionauthComponent
  },
  {
    path: 'solicitudpermiso',
    component: PermissionReqComponent
  },

  {
    path: 'principal',
    component: PrincipalComponent
  },



  {
    path: 'not-found',
    component: NotfoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },


];

export const AppRoutingModule = RouterModule.forRoot(routes, routerOptions);
