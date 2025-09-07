import { Service } from './service_model';
import { Doctor } from './doctor_model';
import { Patient } from './patient_model';

export interface IAppointment {
  id: string | null;
  doctor: Doctor;
  patient: Patient;
  date: Date;
  diagnosis: string;
  diagnosisDescription?: string;
  treatmentDescription?: string;
  services?: Service[];
}

export interface INewAppointmentDto {
  doctorId: string;
  patientId: string;
  diagnosis: string;
  diagnosisDescription?: string;
  treatmentDescription?: string;
  services?: string[];
  date: string; // або Date
}

export class Appointment implements IAppointment {
  id: string | null;
  doctor: Doctor;
  patient: Patient;
  date: Date;
  diagnosis: string;
  diagnosisDescription?: string;
  treatmentDescription?: string;
  services: Service[];
  basicPrice: number;
  price: number;


  constructor(doctor: Doctor,
              patient: Patient,
              date: Date,
              diagnosis: string,
              diagnosisDescription?: string,
              treatmentDescription?: string,
              services: Service[] = [],
              basicPrice: number = 0,
              price: number = 0)
  {
    this.id = null;
    this.doctor = doctor;
    this.patient = patient;
    this.date = date;
    this.diagnosis = diagnosis;
    this.diagnosisDescription = diagnosisDescription;
    this.treatmentDescription = treatmentDescription;
    this.services = services;
    this.basicPrice = basicPrice;
    this.price = price;

  }

}

