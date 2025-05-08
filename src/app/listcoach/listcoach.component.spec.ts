import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcoachComponent } from './listcoach.component';

describe('ListcoachComponent', () => {
  let component: ListcoachComponent;
  let fixture: ComponentFixture<ListcoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcoachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
