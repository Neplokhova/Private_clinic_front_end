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
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {robotoNormal, robotoBold} from "../../../assets/roboto";

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
    MatButtonModule,
    MatSortModule
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

  @ViewChild(MatSort) sort!: MatSort;

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
      this.dataSource.sort = this.sort;
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
          this.dataSource.sort = this.sort;
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

  downloadPDF() {
    const doc = new jsPDF();

    doc.addFileToVFS('Roboto-Regular.ttf', robotoNormal);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.addFileToVFS('Roboto-Bold.ttf', robotoBold);
    doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
    doc.setFont('Roboto', 'normal');


    doc.text(`Фінансовий звіт `, 16,  10);


    const tableColumn = ['Послуга', 'Тип', 'Дата', 'Ціна', 'Ціна зі знижкою'];
    const tableRows: any[] = [];

    this.dataSource.data.forEach(item => {
      const row = [
        item.serviceName,
        item.category,
        new Date(item.date).toLocaleDateString(),
        item.price.toFixed(2),
        item.discountedPrice.toFixed(2)
      ];
      tableRows.push(row);
    });


    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { font: 'Roboto', fontStyle: 'normal', fontSize: 10, cellPadding: 2 },
      headStyles: { font: 'Roboto', fontStyle: 'bold' }
    });


    const finalY = (doc as any).lastAutoTable.finalY || 30;
    doc.setFontSize(12);
    doc.text( ` `, 14, finalY + 10);
    doc.text(`Кількість наданих послуг: ${this.totalCount}`, 14, finalY + 10);
    doc.text(`Сума: ${this.totalPrice.toFixed(2)} грн`, 14, finalY + 16);
    doc.text(`Сума зі знижкою: ${this.totalDiscountedPrice.toFixed(2)} грн`, 14, finalY + 22);

    doc.save('financial_report.pdf');
  }

}
