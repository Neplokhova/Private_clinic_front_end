import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PatientService} from "../../../services/patient-service.service";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-create-new-patient',
  standalone: true,
    imports: [
        ReactiveFormsModule,
      CommonModule
    ],
  templateUrl: './create-new-patient.component.html',
  styleUrl: './create-new-patient.component.css'
})
export class CreateNewPatientComponent {
  @Output() close = new EventEmitter<void>();
  @Output() doctorCreated = new EventEmitter<any>();

  patientForm: FormGroup;


  constructor(private fb: FormBuilder,
              private patientService: PatientService) {
    this.patientForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      birthYear: ['', Validators.required],
    });
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.patientForm.valid) {
      const payload = this.patientForm.value;
      console.log('Відправляємо на сервер:', payload);

      this.patientService.createPatient(payload).subscribe({
        next: (newPatient) => {
          console.log('Пацієнт створений:', newPatient);
          this.doctorCreated.emit(newPatient);
          this.onClose();
          this.patientForm.reset();
        },
        error: (err) => console.error('Помилка при створенні пацієнта', err)
      });
    }
  }
}
