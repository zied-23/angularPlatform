import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcalendarComponent } from './adcalendar.component';

describe('AdcalendarComponent', () => {
  let component: AdcalendarComponent;
  let fixture: ComponentFixture<AdcalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdcalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
