import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../services/patient-service.service';
import {MatFormField, MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-patient-create-dialog',
  templateUrl: './patient-create-dialog.component.html',
  imports: [
    MatLabel,
    MatFormField,
    ReactiveFormsModule
  ],
  standalone: true
})
export class PatientCreateDialogComponent {
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PatientCreateDialogComponent>,
    private patientService: PatientService
  ) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      birthYear: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.patientService.createPatient(this.patientForm.value).subscribe({
        next: (res) => this.dialogRef.close(res),
        error: (err) => console.error('Помилка створення пацієнта', err)
      });
    }
  }
}
