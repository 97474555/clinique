import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeAddEditComponent } from './spe-add-edit.component';

describe('SpeAddEditComponent', () => {
  let component: SpeAddEditComponent;
  let fixture: ComponentFixture<SpeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
