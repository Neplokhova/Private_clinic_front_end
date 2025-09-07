import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {IService} from "../../../service_model";
import {ServiceService} from "../../../services/service.service";

@Component({
  selector: 'app-update-service',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './update-service.component.html',
  styleUrl: './update-service.component.css'
})
export class UpdateServiceComponent {
  @Input() service!: IService;
  @Output() close = new EventEmitter<void>();
  @Output() serviceUpdated = new EventEmitter<IService>();
  @Output() serviceDeleted = new EventEmitter<string>();
  @Output() serviceDblClick = new EventEmitter<IService>();

  serviceForm: FormGroup;

  constructor(private fb: FormBuilder,
              private serviceService: ServiceService) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['service'] && this.service) {
      this.serviceForm.patchValue(this.service);
    }
    if (this.service.category === 'Консультація') {
      this.serviceForm.get('name')?.disable();
      this.serviceForm.get('category')?.disable();
    } else {
      this.serviceForm.get('name')?.enable();
      this.serviceForm.get('category')?.enable();
    }
  }

  onClose() {
    this.close.emit();
  }

  onSave() {
    if (this.serviceForm.valid) {
      const updatedService: IService = {
        ...this.service,
        ...this.serviceForm.value
      };

      this.serviceService.updateService(updatedService).subscribe({
        next: (res) => {
          console.log('Послугу оновлено:', res);
          this.serviceUpdated.emit(res);
          this.close.emit();
        },
        error: (err) => console.error('Помилка збереження:', err)
      });
    }
  }

  onDelete() {
    if (!this.service.id) return;

    if (this.service.category === 'Консультація') {
      alert('Послугу "Консультація" не можна видалити');
      return;
    }

    this.serviceService.deleteService(this.service.id).subscribe({
      next: () => {
        console.log('Послугу видалено');
        this.serviceDeleted.emit(this.service.id!);
        this.close.emit();
      },
      error: (err) => console.error('Помилка видалення:', err)
    });
  }

}
