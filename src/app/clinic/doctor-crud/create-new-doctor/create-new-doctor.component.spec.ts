import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewDoctorComponent } from './create-new-doctor.component';

describe('CreateNewDoctorComponent', () => {
  let component: CreateNewDoctorComponent;
  let fixture: ComponentFixture<CreateNewDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
