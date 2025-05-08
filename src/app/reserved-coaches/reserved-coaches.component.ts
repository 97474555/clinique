import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoachService } from '../services/coach.service';

@Component({
  selector: 'app-reserved-coaches',
  templateUrl: './reserved-coaches.component.html',
  styleUrls: ['./reserved-coaches.component.scss']
})
export class ReservedCoachesComponent implements OnInit {

  displayedColumns: string[] = ['coachName', 'email', 'gender', 'speciality', 'reservationDate'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private coachService: CoachService) {}

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.coachService.getCoachList().subscribe((coaches: any[]) => {
      // Flatten reservations so each availability is a row
      const reservations = coaches
        .filter(coach => Array.isArray(coach.availability) && coach.availability.length > 0)
        .flatMap(coach =>
          coach.availability.map((reservation: string) => ({
            ...coach,
            reservation
          }))
        );

      this.dataSource.data = reservations;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
