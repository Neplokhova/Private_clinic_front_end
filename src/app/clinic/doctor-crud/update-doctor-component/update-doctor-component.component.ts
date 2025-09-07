import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DoctorService} from "../../../services/doctor.service";
import {IDoctor} from "../../../doctor_model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-update-doctor-component',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
      CommonModule
    ],
  templateUrl: './update-doctor-component.component.html',
  styleUrl: './update-doctor-component.component.css'
})
export class UpdateDoctorComponentComponent implements OnChanges {
  @Input() doctor!: IDoctor;
  @Output() close = new EventEmitter<void>();
  @Output() doctorUpdated = new EventEmitter<IDoctor>();
  @Output() doctorDeleted = new EventEmitter<string>();
  @Output() doctorDblClick = new EventEmitter<IDoctor>();

  doctorForm: FormGroup;

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.doctorForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      speciality: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['doctor'] && this.doctor) {
      this.doctorForm.patchValue(this.doctor);
    }
  }

  onClose() {
    this.close.emit();
  }

  onSave() {
    if (this.doctorForm.valid) {
      const updatedDoctor: IDoctor = {
        ...this.doctor,
        ...this.doctorForm.value
      };

      this.doctorService.updateDoctor(updatedDoctor).subscribe({
        next: (res) => {
          console.log('Лікаря оновлено:', res);
          this.doctorUpdated.emit(res);
          this.close.emit();
        },
        error: (err) => console.error('Помилка збереження:', err)
      });
    }
  }

  onDelete() {
    if (!this.doctor.id) return;

    this.doctorService.deleteDoctor(this.doctor.id).subscribe({
      next: () => {
        console.log('Лікаря видалено');
        this.doctorDeleted.emit(this.doctor.id!);
        this.close.emit();
      },
      error: (err) => console.error('Помилка видалення:', err)
    });
  }


}
