import {Component, ViewChild} from '@angular/core';
import {ServiceTableComponent} from "./service-table/service-table.component";
import {CommonModule} from "@angular/common";
import {IService} from "../../service_model";
import {CreateNewServiceComponent} from "./create-new-service/create-new-service.component";
import {UpdateServiceComponent} from "./update-service/update-service.component";
import {ServiceService} from "../../services/service.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-services-crud',
  standalone: true,
  imports: [
    ServiceTableComponent,
    CommonModule,
    CreateNewServiceComponent,
    UpdateServiceComponent,
  ],
  templateUrl: './services-crud.component.html',
  styleUrl: './services-crud.component.css'
})
export class ServicesCrudComponent {
selectedServices: IService[] = [];

  @ViewChild(ServiceTableComponent) table!: ServiceTableComponent;

  constructor ( private router: Router,
                private serviceService: ServiceService){}

  showServiceModal = false;
  openServiceModal() {
    this.showServiceModal = true;
  }

  closeServiceModal() {
    this.showServiceModal = false;
  }

  onServiceCreated() {
    this.closeServiceModal();
    this.table.reloadData();
  }

  selectedService: IService | null = null;
  showUpdateServiceModal = false;

  openUpdateServiceModal(service: IService) {
    this.selectedService = service;
    this.showUpdateServiceModal = true;
  }

  closeUpdateServiceModal() {
    this.showUpdateServiceModal = false;
    this.selectedService = null;
  }

  onServiceUpdated(updated: IService) {
    console.log('Оновлено лікаря:', updated);
    this.table.reloadData();
  }

  onServiceDeleted(id: string) {
    console.log('Видалено лікаря з id:', id);
    this.table.reloadData();
  }

}
