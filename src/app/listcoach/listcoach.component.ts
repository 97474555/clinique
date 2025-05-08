
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoachService } from '../services/coach.service';
import { CoreService } from '../core/core.service';
import { CoaAddEditComponent } from '../coa-add-edit/coa-add-edit.component';



@Component({
  selector: 'app-listcoach',
  templateUrl: './listcoach.component.html',
  styleUrls: ['./listcoach.component.scss']
})
export class ListcoachComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'gender',
    'speciality',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _coaService: CoachService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getCoachList();
  }

  openAddEditCoaForm() {
    const dialogRef = this._dialog.open(CoaAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCoachList();
        }
      },
    });
  }

  getCoachList() {
    this._coaService.getCoachList().subscribe({
      next: (res) => {
        console.log(res['length'])
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

  deleteCoach(id: string) {
    this._coaService.deleteCoach(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Coach deleted!', 'done');
        this.getCoachList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CoaAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCoachList();
        }
      },
    });
  }
}
