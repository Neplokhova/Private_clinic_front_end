import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ServiceService} from "../../../services/service.service";

@Component({
  selector: 'app-create-new-service',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './create-new-service.component.html',
  styleUrl: './create-new-service.component.css'
})


export class CreateNewServiceComponent {
  @Output() close = new EventEmitter<void>();
  @Output() serviceCreated = new EventEmitter<any>();
  serviceForm: FormGroup;

  constructor(private fb: FormBuilder,
              private serviceService: ServiceService) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required]
    });
  }
  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      const payload = this.serviceForm.value;
      console.log('Відправляємо на сервер:', payload);

      this.serviceService.createService(payload).subscribe({
        next: (newService) => {
          console.log('Послуга створена:', newService);
          this.serviceCreated.emit(newService);
          this.onClose();
          this.serviceForm.reset();
        },
        error: (err) => console.error('Помилка при створенні лікаря', err)
      });
    }
  }
}
