import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReportService } from '../../services/report.service';
import {IProvidedService} from "../../provided_service_model";


@Component({
  selector: 'app-create-fin-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './create-fin-report.component.html',
  styleUrl: './create-fin-report.component.css'
})
export class CreateFinReportComponent implements OnInit {
  dataSource = new MatTableDataSource<IProvidedService>([]);
  services: IProvidedService[] = [];
  startDate: string = ''; // формат yyyy-MM-dd для <input type="date">
  endDate: string = '';
  category: string = 'all';

  displayedColumns: string[] = [
    'serviceName',
    'serviceCategory',
    'date',
    'price',
    'discountedPrice'
  ];

  totalPrice: number = 0;
  totalDiscountedPrice: number = 0;
  totalCount: number = 0;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.getReports().subscribe(data => {
      this.updateTable(data);
    });
  }

  loadReport() {
    if (!this.startDate || !this.endDate) {
      alert('Будь ласка, виберіть період');
      return;
    }


    const start = new Date(this.startDate);
    const end = new Date(this.endDate);


    this.reportService.getReportWithParam(start, end, this.category)
      .subscribe({
        next: (data: IProvidedService[]) => {
          this.updateTable(data);
        },
        error: (err) => {
          console.error('Помилка завантаження звіту', err);
          alert('Сталася помилка при завантаженні звіту');
        }
      });
  }

  private updateTable(data: IProvidedService[]) {
    this.services = data;
    this.dataSource.data = data;

    this.totalCount = data.length;
    this.totalPrice = data.reduce((sum, s) => sum + s.price, 0);
    this.totalDiscountedPrice = data.reduce((sum, s) => sum + s.discountedPrice, 0);
  }

}
