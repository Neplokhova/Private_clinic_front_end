import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IDoctor} from "../doctor_model";


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:3000/doctors';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<IDoctor[]> {
    return this.http.get<IDoctor[]>(this.apiUrl);
  }

  deleteDoctor(id: string | null): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  updateDoctor(doctor: IDoctor): Observable<IDoctor> {
    return this.http.put<IDoctor>(`${this.apiUrl}/${doctor.id}`, doctor);
  }

  createDoctor(doctor: IDoctor): Observable<IDoctor> {
    return this.http.post<IDoctor>(this.apiUrl, doctor);
  }
}
