import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsDashboardComponent } from './us-dashboard.component';

describe('UsDashboardComponent', () => {
  let component: UsDashboardComponent;
  let fixture: ComponentFixture<UsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
