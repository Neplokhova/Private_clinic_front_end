import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IService} from "../service_model";
import {IAppointment, INewAppointmentDto} from "../appointment_model";



@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) { }

  createAppointment(dto: INewAppointmentDto): Observable<IAppointment> {
    return this.http.post<IAppointment>(this.apiUrl, dto);
  }
}
