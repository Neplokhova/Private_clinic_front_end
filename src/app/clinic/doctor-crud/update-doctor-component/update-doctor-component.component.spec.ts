import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoctorComponentComponent } from './update-doctor-component.component';

describe('UpdateDoctorComponentComponent', () => {
  let component: UpdateDoctorComponentComponent;
  let fixture: ComponentFixture<UpdateDoctorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDoctorComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDoctorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
