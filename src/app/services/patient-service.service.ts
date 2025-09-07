import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPatient} from "../patient_model";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/patients';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>(this.apiUrl);
  }

  deletePatient(id: string | null): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  updatePatient(patient: IPatient): Observable<IPatient> {
    return this.http.put<IPatient>(`${this.apiUrl}/${patient.id}`, patient);
  }

  createPatient(patient: IPatient): Observable<IPatient> {
    return this.http.post<IPatient>(this.apiUrl, patient);
  }
}
