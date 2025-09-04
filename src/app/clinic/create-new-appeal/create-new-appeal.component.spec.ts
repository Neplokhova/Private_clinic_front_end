import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAppealComponent } from './create-new-appeal.component';

describe('CreateNewAppealComponent', () => {
  let component: CreateNewAppealComponent;
  let fixture: ComponentFixture<CreateNewAppealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewAppealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewAppealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
