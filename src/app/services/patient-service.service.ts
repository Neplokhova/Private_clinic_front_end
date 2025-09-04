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

  deletePatients(ids: string[]): Observable<any> {
    return this.http.delete(this.apiUrl, { body: { ids } });
  }

  createPatient(patient: IPatient): Observable<IPatient> {
    return this.http.post<IPatient>(this.apiUrl, patient);
  }
}
