import { OnInit, ViewChild } from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Component, EventEmitter, Output } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { IPatient } from '../../../patient_model';
import { PatientService } from '../../../services/patient-service.service';
import {MatPaginatorModule} from "@angular/material/paginator";


@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrl: './patients-table.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class PatientsTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'birthYear'];
  dataSource = new MatTableDataSource<IPatient>([]);
  selectedPatients: IPatient[] = [];

  @Output() selectionChange = new EventEmitter<IPatient[]>();

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data => {
      console.log('backend data:', data);
      this.dataSource.data = data;   // присвоюємо масив із сервера
      this.dataSource.sort = this.sort;
    });
  }

  togglePatientSelection(patient: IPatient) {
    const index = this.selectedPatients.indexOf(patient);

    if (index === -1) {
      // Пацієнт ще не обраний → додаємо
      this.selectedPatients.push(patient);
    } else {
      // Пацієнт уже обраний → видаляємо
      this.selectedPatients.splice(index, 1);
    }

    console.log('Обрані пацієнти:', this.selectedPatients);
  }

  openPatientDetails(patient: IPatient) {
    console.log('Відкрити деталі пацієнта:', patient);
  }
}
