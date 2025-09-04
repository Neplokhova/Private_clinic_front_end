import { Routes } from '@angular/router';
import {MainWindowComponent} from "./clinic/main-window/main-window.component";
import {PatientCrudComponent} from "./clinic/patient-crud/patient-crud.component";
import {DoctorCrudComponent} from "./clinic/doctor-crud/doctor-crud.component";
import {ServicesCrudComponent} from "./clinic/services-crud/services-crud.component";
import {CreateNewPatientComponent} from "./clinic/create-new-patient/create-new-patient.component";
import {CreateNewAppealComponent} from "./clinic/create-new-appeal/create-new-appeal.component";
import {CreateFinReportComponent} from "./clinic/create-fin-report/create-fin-report.component";

export const routes: Routes = [
  { path: '', component: MainWindowComponent },
  { path: 'patients', component: PatientCrudComponent },
  { path: 'doctors', component: DoctorCrudComponent },
  { path: 'services', component: ServicesCrudComponent },
  { path: 'new_appeal', component: CreateNewAppealComponent },
  { path: 'fin_report', component: CreateFinReportComponent },
  { path: 'new_patient', component: CreateNewPatientComponent }
];
