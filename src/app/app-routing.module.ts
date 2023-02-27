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
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/rols.model';
import { PermissionauthComponent } from './components/newviews/permissionauth/permissionauth.component';
import { PermissionComponent } from './components/partials/permission/permission.component';
import { PermissionReqComponent } from './components/newviews/permission/permissionreq.component';
import { StatuspermissionComponent } from './components/newviews/statuspermission/statuspermission.component';
import { RequestReportComponent } from './components/newviews/request-report/request-report.component';


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
    component: AuthorizationComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] }
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
    data: { roles: [Role.admin] }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'usuarios',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] }
  },
  {
    path: 'dependency',
    component: JobdependencyComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin, Role.member] }
  },

  {
    path: 'SolicitudesDePermisos',
    component: RequestReportComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin, Role.member, Role.boss, Role.boss2] }
  },
  {
    path: 'solicitudes',
    component: GridrequestvacationComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin, Role.member] }
  },
  {
    path: 'constancia/:idPerson',
    component: CertificationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'personas',
    component: PersonGridComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin, Role.member] }
  },
  {
    path: 'curriculum',
    component: CurriculumComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.boss, Role.boss2, Role.employed] }
  },
  {
    path: 'permisos',
    component: PermissionauthComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.boss, Role.boss2, Role.employed] }
  },
  {
    path: 'estadopermisos',
    component: StatuspermissionComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.boss, Role.boss2, Role.employed] }
  },
  {
    path: 'solicitudpermiso',
    component: PermissionReqComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.boss, Role.boss2, Role.employed] }
  },
  {
    path: 'solicitudpermiso/edit/:id',
    component: PermissionReqComponent,
    canActivate: [AuthGuard],
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
