import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {IDoctor} from "../../doctor_model";
import {DoctorService} from "../../services/doctor.service";
import {CommonModule} from "@angular/common";
import {IPatient} from "../../patient_model";
import {PatientService} from "../../services/patient-service.service";
import {IService} from "../../service_model";
import {ServiceService} from "../../services/service.service";
import {AppointmentService} from "../../services/appointment.service";
import {INewAppointmentDto} from "../../appointment_model";

@Component({
  selector: 'app-create-new-appeal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './create-new-appeal.component.html',
  styleUrl: './create-new-appeal.component.css'
})
export class CreateNewAppealComponent implements OnInit {
  doctors: IDoctor[] = [];
  patients: IPatient[] = [];
  services: IService[] = [];
  selectedDoctorId: string | null = null;
  selectedPatientId: string | null = null;
  selectedServiceId: string[] = [];
  diagnosis: string = '';
  diagnosisDescription: string = '';
  treatmentDescription: string = '';
  dateString: string = '';


  constructor(private doctorService: DoctorService,
              private patientService: PatientService,
              private serviceService: ServiceService,
              private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.loadPatients();
    this.loadServices();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (data) => this.doctors = data,
      error: (err) => console.error('Помилка завантаження лікарів', err)
    });
  }

  loadPatients() {
    this.patientService.getPatients().subscribe({
      next: (data) => this.patients = data,
      error: (err) => console.error('Помилка завантаження пацієнтів', err)
    });
  }


  loadServices() {
    this.serviceService.getServices().subscribe({
      next: (data) => { this.services = data.filter(s => s.category === 'Процедура');},
      error: (err) => console.error('Помилка завантаження послуг', err)
    });
  }

  onServicesChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedServiceId = Array.from(select.selectedOptions).map(option => option.value);
    console.log('Вибрані послуги:', this.selectedServiceId);
  }

  createAppointment() {
    if (!this.selectedDoctorId || !this.selectedPatientId || !this.dateString) {
      alert('Виберіть лікаря та пацієнта та дату');
      return;
    }

    const appointmentDate = new Date(this.dateString);

    const newAppointment: INewAppointmentDto = {
      doctorId: this.selectedDoctorId,
      patientId: this.selectedPatientId,
      diagnosis: this.diagnosis,
      diagnosisDescription: this.diagnosisDescription,
      treatmentDescription: this.treatmentDescription,
      services: this.selectedServiceId,
      date: appointmentDate.toISOString(),
    };

    this.appointmentService.createAppointment(newAppointment).subscribe({
      next: (res) => {
        console.log('Звернення створено', res);
        console.log(newAppointment.date);
        alert('Звернення успішно створено!');
        this.selectedDoctorId = null;
        this.selectedPatientId = null;
        this.selectedServiceId = [];
        this.diagnosis = '';
        this.diagnosisDescription = '';
        this.treatmentDescription = '';
        this.dateString = '';
      },
      error: (err) => {
        console.error('Помилка створення звернення', err);
        alert('Сталася помилка при створенні звернення');
      }
    });

  }
  }
