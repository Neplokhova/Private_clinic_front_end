import { Routes } from '@angular/router';
import {MainWindowComponent} from "./clinic/main-window/main-window.component";
import {PatientCrudComponent} from "./clinic/patient-crud/patient-crud.component";
import {DoctorCrudComponent} from "./clinic/doctor-crud/doctor-crud.component";
import {ServicesCrudComponent} from "./clinic/services-crud/services-crud.component";
import {CreateNewAppealComponent} from "./clinic/create-new-appeal/create-new-appeal.component";
import {CreateFinReportComponent} from "./clinic/create-fin-report/create-fin-report.component";
import {OpenPatientComponent} from "./clinic/open-patient/open-patient.component";
import {AuthGuard} from "./guard/auth.guard";
import { LoginComponent } from './clinic/login/login.component';
import {RegisterComponent} from "./clinic/register/register.component";

export const routes: Routes = [
  { path: 'main', component: MainWindowComponent, canActivate: [AuthGuard] },
  { path: 'patients', component: PatientCrudComponent, canActivate: [AuthGuard] },
  { path: 'doctors', component: DoctorCrudComponent, canActivate: [AuthGuard] },
  { path: 'services', component: ServicesCrudComponent, canActivate: [AuthGuard] },
  { path: 'new_appeal', component: CreateNewAppealComponent, canActivate: [AuthGuard] },
  { path: 'fin_report', component: CreateFinReportComponent, canActivate: [AuthGuard] },
  { path: 'patients/:id', component: OpenPatientComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
