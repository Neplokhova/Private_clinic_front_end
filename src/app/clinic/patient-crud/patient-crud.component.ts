import {Component, ViewChild} from '@angular/core';
import {PatientsTableComponent} from "./patients-table/patients-table.component";
import {IPatient} from "../../patient_model";
import {PatientService} from "../../services/patient-service.service";
import {NgIf} from "@angular/common";
import {CreateNewPatientComponent} from "./create-new-patient/create-new-patient.component";



@Component({
  selector: 'app-patient-crud',
  standalone: true,
  imports: [
    PatientsTableComponent,
    CreateNewPatientComponent,
    NgIf,
  ],
  templateUrl: './patient-crud.component.html',
  styleUrl: './patient-crud.component.css'
})
export class PatientCrudComponent {
  selectedPatients: IPatient[] = [];
  @ViewChild(PatientsTableComponent) table!: PatientsTableComponent;

  constructor (private patientService: PatientService) {};

  showPatientModal = false;
  onSelectionChange(patients: IPatient[]) {
    this.selectedPatients = patients;
    console.log('Обрані пацієнти у батька:', this.selectedPatients);
  }

  openPatientModal() {
    this.showPatientModal = true;
  }

  closePatientModal() {
    this.showPatientModal = false;
    this.table.reloadData();
  }

  onPatientCreated(newPatient: any) {
    console.log('Новий лікар створений', newPatient);
    this.closePatientModal();
    this.table.reloadData();
  }



}
