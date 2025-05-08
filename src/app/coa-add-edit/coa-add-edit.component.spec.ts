import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoaAddEditComponent } from './coa-add-edit.component';



describe('CoaAddEditComponent', () => {
  let component: CoaAddEditComponent;
  let fixture: ComponentFixture<CoaAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoaAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoaAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
