import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { PatientService } from '../services/patient.service';
import { CoachService } from '../services/coach.service';
import * as _DB from 'db.json';
@Component({
  selector: 'app-pat-add-edit',
  templateUrl: './pat-add-edit.component.html',
  styleUrls: ['./pat-add-edit.component.scss']
})
export class PatAddEditComponent {
  patForm: FormGroup;

 
  constructor(
    public coaService  : CoachService,
    private _fb: FormBuilder,
    private patService: PatientService,
    private _dialogRef: MatDialogRef<PatAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.patForm = this._fb.group({
      firstName: '',
      lastName: '',
      
      gender: '',
      case:'',
      
      coach: '',
    });
  }

  ngOnInit(): void {
    this.patForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.patForm.valid) {
      if (this.data) {
        this.patService
          .updatePatient(this.data.id, this.patForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Patient detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.patService.addPatient(this.patForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('patient added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}


