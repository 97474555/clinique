import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { CoachService } from '../services/coach.service';
import { SpecialtyService } from '../services/specialty.service';

@Component({
  selector: 'app-spe-add-edit',
  templateUrl: './spe-add-edit.component.html',
  styleUrls: ['./spe-add-edit.component.scss']
})
export class SpeAddEditComponent {
  sForm: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private _fb: FormBuilder,
    private _sService: SpecialtyService,
    private _dialogRef: MatDialogRef<SpeAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    public DS: CoachService
  ) {
    this.sForm = this._fb.group({
      name: '',
      image: ''  // ✅ On ajoute le champ image dans le form
    });
  }

  ngOnInit(): void {
    this.sForm.patchValue(this.data);

    if (this.data?.image) {
      this.previewUrl = this.data.image; // ✅ afficher l'image si déjà existante (mode modification)
    }
  }

  // ✅ Quand l’utilisateur sélectionne un fichier
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      // Prévisualisation
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result;
      reader.readAsDataURL(this.selectedFile);

      // Stocker le base64 dans le formulaire
      reader.onloadend = () => {
        this.sForm.patchValue({
          image: reader.result  // Stocker l’image en base64
        });
      };
    }
  }

  onFormSubmit() {
    if (this.sForm.valid) {
      if (this.data) {
        this._sService.updateS(this.data.id, this.sForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('speciality detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._sService.addS(this.sForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('speciality added successfully');
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
