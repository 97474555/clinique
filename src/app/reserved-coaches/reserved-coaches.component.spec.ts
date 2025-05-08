import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedCoachesComponent } from './reserved-coaches.component';

describe('ReservedCoachesComponent', () => {
  let component: ReservedCoachesComponent;
  let fixture: ComponentFixture<ReservedCoachesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservedCoachesComponent]
    });
    fixture = TestBed.createComponent(ReservedCoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
