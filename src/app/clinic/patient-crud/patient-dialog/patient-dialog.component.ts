import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { IPatient } from '../../../patient_model';
import { PatientService } from '../../../services/patient-service.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrl: './patient-dialog.component.css',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions
  ],
  standalone: true
})
export class PatientDialogComponent {
  patient!: IPatient;

  constructor(
    private dialogRef: MatDialogRef<PatientDialogComponent>,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: IPatient
  ) {
    this.patient = { ...data };
  }

  saveChanges() {
    this.patientService.updatePatient(this.patient).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => console.error('Помилка збереження:', err)
    });
  }

  deletePatient() {
    this.patientService.deletePatient(this.patient.id).subscribe({
      next: () => this.dialogRef.close('deleted'),
      error: err => console.error('Помилка видалення:', err)
    });
  }

  close() {
    this.dialogRef.close();
  }
}
