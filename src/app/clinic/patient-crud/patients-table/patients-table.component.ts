import { OnInit, ViewChild } from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Component, EventEmitter, Output } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { IPatient } from '../../../patient_model';
import { PatientService } from '../../../services/patient-service.service';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MatDialog } from '@angular/material/dialog';
import {PatientDialogComponent} from "../patient-dialog/patient-dialog.component";

@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrl: './patients-table.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule]
})
export class PatientsTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'birthYear'];
  dataSource = new MatTableDataSource<IPatient>([]);

  @Output() selectionChange = new EventEmitter<IPatient[]>();
  @Output() reload = new EventEmitter<void>();

  constructor(private patientService: PatientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data => {
      console.log('backend data:', data);
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  reloadData() {
    this.patientService.getPatients().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openPatientDetails(patient: IPatient) {
    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '400px',
      data: patient
    });
    console.log('Відкрити деталі пацієнта:', patient);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true || result === 'deleted') {
        // якщо збережено або видалено → можна оновити таблицю
        this.patientService.getPatients().subscribe(data => this.dataSource.data = data);
      }
    });
  }
}
