import { OnInit, ViewChild } from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Component, EventEmitter, Output } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { IDoctor } from '../../../doctor_model';
import { DoctorService } from '../../../services/doctor.service';
import {MatPaginatorModule} from "@angular/material/paginator";


@Component({
  selector: 'app-doctors-table',
  templateUrl: './doctors-table.component.html',
  styleUrl: './doctors-table.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class DoctorsTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'speciality', 'category'];
  dataSource = new MatTableDataSource<IDoctor>([]);

  @Output() selectionChange = new EventEmitter<IDoctor[]>();
  @Output() reload = new EventEmitter<void>();
  @Output() doctorDblClick = new EventEmitter<IDoctor>();

  constructor(private doctorService: DoctorService) {}

  onRowDblClick(doctor: IDoctor) {
    this.doctorDblClick.emit(doctor);
  }

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe(data => {
      console.log('backend data:', data);
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  reloadData() {
    this.doctorService.getDoctors().subscribe(data => {
      this.dataSource.data = data;
    });
  }


}
