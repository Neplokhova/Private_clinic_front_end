import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFinReportComponent } from './create-fin-report.component';

describe('CreateFinReportComponent', () => {
  let component: CreateFinReportComponent;
  let fixture: ComponentFixture<CreateFinReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFinReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateFinReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
