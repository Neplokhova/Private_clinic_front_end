import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPatientComponent } from './open-patient.component';

describe('OpenPatientComponent', () => {
  let component: OpenPatientComponent;
  let fixture: ComponentFixture<OpenPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
