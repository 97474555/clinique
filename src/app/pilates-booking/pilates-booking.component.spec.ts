import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilatesBookingComponent } from './pilates-booking.component';

describe('PilatesBookingComponent', () => {
  let component: PilatesBookingComponent;
  let fixture: ComponentFixture<PilatesBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PilatesBookingComponent]
    });
    fixture = TestBed.createComponent(PilatesBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
