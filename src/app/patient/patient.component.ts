import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { PatientService } from '../services/patient.service';
import { PatAddEditComponent } from '../pat-add-edit/pat-add-edit.component';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
    displayedColumns: string[] = [
      'id',
      'firstName',
      'lastName',  
      'gender',
      'case',
      'action'
    ];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(
      private _dialog: MatDialog,
      private _patService: PatientService,
      private _coreService: CoreService
    ) {}
  
    ngOnInit(): void {
      this.getPatientList();
    }
  
    openAddEditPatForm() {
      const dialogRef = this._dialog.open(PatAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getPatientList();
          }
        },
      });
    }
  
    getPatientList() {
      this._patService.getPatientList().subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: console.log,
      });
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    deletePatient(id: number) {
      this._patService.deletePatient(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Patient deleted!', 'done');
          this.getPatientList();
        },
        error: console.log,
      });
    }
  
    openEditForm(data: any) {
      const dialogRef = this._dialog.open(PatAddEditComponent, {
        data,
      });
  
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getPatientList();
          }
        },
      });
    }
  }
