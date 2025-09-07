import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { PatientService } from '../../services/patient-service.service';
import {MatIconButton} from "@angular/material/button";
import {MatDialogClose, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create-dialog.component.html',
  imports: [
    ReactiveFormsModule,
    MatIconButton,
    MatDialogClose,
    MatDialogTitle,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  standalone: true
})
export class PatientCreateDialogComponent {
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private dialogRef: MatDialogRef<PatientCreateDialogComponent>
  ) {
    this.patientForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      birthYear: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.patientService.createPatient(this.patientForm.value).subscribe({
        next: (res) => {
          console.log('Пацієнт створений:', res);
          this.dialogRef.close(res);
        },
        error: (err) => console.error('Помилка при створенні пацієнта', err)
      });
    }
  }
}
