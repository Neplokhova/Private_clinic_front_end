import { Component } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {FormsModule} from "@angular/forms";
import {IPatient} from "../../patient_model";
import {IAppointment} from "../../appointment_model";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../services/patient-service.service";
import {AppointmentService} from "../../services/appointment.service";
import {CommonModule, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-open-patient',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    FormsModule,
    NgForOf,
    NgIf,
    CommonModule,
  ],
  templateUrl: './open-patient.component.html',
  styleUrl: './open-patient.component.css'
})
export class OpenPatientComponent {
  patient!: IPatient;
  appointments: IAppointment[] = [];
  discountText: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {

      this.patientService.getPatientById(patientId).subscribe({
        next: data => {
          this.patient = data;
          this.calculateDiscount();
          },
        error: err => console.error(err)
      });


      this.appointmentService.getAppointmentsByPatient(patientId).subscribe({
        next: data => this.appointments = data,
        error: err => console.error(err)
      });
    }
  }

  saveChanges() {
    this.patientService.updatePatient(this.patient).subscribe({
      next: () => this.router.navigate(['/patients']),
      error: err => console.error(err)
    });
  }

  deletePatient() {
    this.patientService.deletePatient(this.patient.id).subscribe({
      next: () => this.router.navigate(['/patients']),
      error: err => console.error(err)
    });
  }



  calculateDiscount() {
    if (!this.patient?.birthYear) {
      this.discountText = 'Знижка відсутня';
      return;
    }

    const currentYear = new Date().getFullYear();
    const age = currentYear - this.patient.birthYear;

    if (age < 18) {
      this.discountText = 'Знижка — дитяча 20%';
    } else if (age >= 60) {
      this.discountText = 'Знижка — пенсійна 15%';
    } else {
      this.discountText = 'Знижка відсутня';
    }
  }
}

