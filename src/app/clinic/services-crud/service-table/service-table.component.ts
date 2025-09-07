import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {IService} from "../../../service_model";
import {ServiceService} from "../../../services/service.service";

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrl: './service-table.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class ServiceTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<IService>([]);
  displayedColumns: string[] = ['name', 'category', 'price'];

  @Output() selectionChange = new EventEmitter<IService[]>();
  @Output() reload = new EventEmitter<void>();
  @Output() serviceDblClick = new EventEmitter<IService>();

  constructor (private serviceService: ServiceService) {}

  onRowDblClick(service: IService) {
    this.serviceDblClick.emit(service);
  }
  ngOnInit(): void {
    this.serviceService.getServices().subscribe(data => {
      console.log('backend data:', data);
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }
  reloadData() {
    this.serviceService.getServices().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}

