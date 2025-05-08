import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { SpecialtyService } from '../services/specialty.service';
import { SpeAddEditComponent } from '../spe-add-edit/spe-add-edit.component';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent {
  displayedColumns: string[] = [
    'id',
    'Name',
    'image',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _sService: SpecialtyService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getSList();
  }

  openAddEditSForm() {
    const dialogRef = this._dialog.open(SpeAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSList();
        }
      },
    });
  }

  getSList() {
    this._sService.getSList().subscribe({
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

  deleteS(id: number) {
    this._sService.deleteS(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('speciality deleted!', 'done');
        this.getSList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(SpeAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSList();
        }
      },
    });
  }
}
