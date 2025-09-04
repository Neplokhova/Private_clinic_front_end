import { Component } from '@angular/core';
import {PatientsTableComponent} from "./patients-table/patients-table.component";
import {Router} from "@angular/router";
import {IPatient} from "../../patient_model";
import {PatientService} from "../../services/patient-service.service";
import {MatDialog} from "@angular/material/dialog";
import {PatientCreateDialogComponent} from "../patient-create-dialog/patient-create-dialog.component";

@Component({
  selector: 'app-patient-crud',
  standalone: true,
  imports: [
    PatientsTableComponent
  ],
  templateUrl: './patient-crud.component.html',
  styleUrl: './patient-crud.component.css'
})
export class PatientCrudComponent {
  selectedPatients: IPatient[] = [];

  constructor (private router: Router,
               private patientService: PatientService,
               private dialog: MatDialog) {};


  onSelectionChange(patients: IPatient[]) {
    this.selectedPatients = patients;
    console.log('Обрані пацієнти у батька:', this.selectedPatients);
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PatientCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Новий пацієнт створений:', result);
        // Тут можна оновити таблицю пацієнтів
      }
    });
  }

  deleteSelectedPatients() {
    const ids = this.selectedPatients.map(p => p.id).filter(id => !!id) as string[];
    if (ids.length === 0) return;

    this.patientService.deletePatients(ids).subscribe({
      next: () => {
        console.log('Пацієнти видалені:', ids);
        this.selectedPatients = [];
      },
      error: err => console.error('Помилка видалення пацієнтів:', err)
    });
  }
}
