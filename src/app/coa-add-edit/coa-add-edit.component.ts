import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { CoachService } from '../services/coach.service';
import { SpecialtyService } from '../services/specialty.service';

@Component({
  selector: 'app-coa-add-edit',
  templateUrl: './coa-add-edit.component.html',
  styleUrls: ['./coa-add-edit.component.scss'],
})
export class CoaAddEditComponent implements OnInit {
  coaForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _coaService: CoachService,
    private _dialogRef: MatDialogRef<CoaAddEditComponent>,
    public SS:SpecialtyService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.coaForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      
      gender: '',
      speciality:'',
 
    });
  }

  ngOnInit(): void {
    this.coaForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.coaForm.valid) {
      if (this.data) {
        this._coaService
          .updateCoach(this.data.id, this.coaForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Coach detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._coaService.addCoach(this.coaForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Coach added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }}