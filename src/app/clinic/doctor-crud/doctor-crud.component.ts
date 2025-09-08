import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {IDoctor} from "../../doctor_model";
import {DoctorService} from "../../services/doctor.service";
import {DoctorsTableComponent} from "./doctors-table/doctors-table.component";
import {CreateNewDoctorComponent} from "./create-new-doctor/create-new-doctor.component";
import {CommonModule} from "@angular/common";
import {UpdateDoctorComponentComponent} from "./update-doctor-component/update-doctor-component.component";



@Component({
  selector: 'app-doctor-crud',
  standalone: true,
  imports: [
    DoctorsTableComponent,
    CommonModule,
    CreateNewDoctorComponent,
    UpdateDoctorComponentComponent
  ],
  templateUrl: './doctor-crud.component.html',
  styleUrl: './doctor-crud.component.css'
})
export class DoctorCrudComponent {
  selectedDoctors: IDoctor[] = [];
  @ViewChild(DoctorsTableComponent) table!: DoctorsTableComponent;

  constructor (private router: Router,
               private doctorService: DoctorService) {};

  selectedDoctor: IDoctor | null = null;
  showUpdateDoctorModal = false;
  showDoctorModal = false;
  openDoctorModal() {
    this.showDoctorModal = true;
  }

  closeDoctorModal() {
    this.showDoctorModal = false;
  }

  onDoctorCreated(newDoctor: any) {
    console.log('Новий лікар створений', newDoctor);
    this.closeDoctorModal();
    this.table.reloadData();
  }




  openUpdateDoctorModal(doctor: IDoctor) {
    this.selectedDoctor = doctor;
    this.showUpdateDoctorModal = true;
  }

  closeUpdateDoctorModal() {
    this.showUpdateDoctorModal = false;
    this.selectedDoctor = null;
  }

  onDoctorUpdated(updated: IDoctor) {
    console.log('Оновлено лікаря:', updated);
    this.table.reloadData();
  }

  onDoctorDeleted(id: string) {
    console.log('Видалено лікаря з id:', id);
    this.table.reloadData();
  }
}
