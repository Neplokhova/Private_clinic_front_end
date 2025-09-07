import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProvidedService} from "../provided_service_model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:3000/report'

  constructor(private http: HttpClient) {}

  getReports(): Observable<IProvidedService[]>{
    return this.http.get<IProvidedService[]>(this.apiUrl)}

  getReportWithParam(startDate: Date, endDate: Date, category: string): Observable<IProvidedService[]> {
    const params: any = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    if (category && category !== 'all') {
      params.category = category;
    }

    return this.http.get<IProvidedService[]>(this.apiUrl + '/filter', { params });
  }
}
