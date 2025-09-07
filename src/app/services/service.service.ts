import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IService} from "../service_model";


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000/services';

  constructor(private http: HttpClient) {}

  getServices(): Observable<IService[]> {
    return this.http.get<IService[]>(this.apiUrl);
  }

  deleteService(id: string | null): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  updateService(service: IService): Observable<IService> {
    return this.http.put<IService>(`${this.apiUrl}/${service.id}`, service);
  }

  createService(service: IService): Observable<IService> {
    return this.http.post<IService>(this.apiUrl, service);
  }
}
