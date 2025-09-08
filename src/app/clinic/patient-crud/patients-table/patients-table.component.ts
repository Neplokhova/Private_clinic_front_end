import { OnInit, ViewChild } from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Component, EventEmitter, Output } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { IPatient } from '../../../patient_model';
import { PatientService } from '../../../services/patient-service.service';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {Router} from "@angular/router";

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

  constructor(private patientService: PatientService,
              private router: Router) {}

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

  openPatientDetails(patient: any) {
    this.router.navigate(['/patients', patient.id]);
  }
}
