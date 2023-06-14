import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsidenavComponent } from './usidenav.component';

describe('UsidenavComponent', () => {
  let component: UsidenavComponent;
  let fixture: ComponentFixture<UsidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
