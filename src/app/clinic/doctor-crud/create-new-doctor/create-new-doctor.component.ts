import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {DoctorService} from "../../../services/doctor.service";

@Component({
  selector: 'app-doctor-create-modal',
  templateUrl: './create-new-doctor.component.html',
  styleUrls: ['./create-new-doctor.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,
  CommonModule]
})
export class CreateNewDoctorComponent {
  @Output() close = new EventEmitter<void>();
  @Output() doctorCreated = new EventEmitter<any>();

  doctorForm: FormGroup;


  constructor(private fb: FormBuilder,
              private doctorService: DoctorService) {
    this.doctorForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      speciality: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      const payload = this.doctorForm.value;
      console.log('Відправляємо на сервер:', payload);

      this.doctorService.createDoctor(payload).subscribe({
        next: (newDoctor) => {
          console.log('Доктор створений:', newDoctor);
          this.doctorCreated.emit(newDoctor);
          this.onClose();
          this.doctorForm.reset();
        },
        error: (err) => console.error('Помилка при створенні лікаря', err)
      });
    }
    }

}
