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
    path: 'not-found',
    component: NotfoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes, routerOptions);
