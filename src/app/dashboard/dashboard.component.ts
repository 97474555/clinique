import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { AppointmentService } from '../services/appointment.service';
import { CoachService } from '../services/coach.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Cards Stats
  nb_Coachs: number = 0;
  nb_Patients: number = 0;
  nb_Speciality: number = 5;
  nb_Appointments: number = 0;

  // Bar Chart
  reservationChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Réservations' }]
  };

  // Pie Chart
  coachPieChartLabels: string[] = ['Réservés', 'Non réservés'];
  coachPieChartData: ChartData<'pie'> = {
    labels: this.coachPieChartLabels,
    datasets: [{ data: [] }]
  };

  // Line Chart
  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{ data: [], label: 'Réservations Cumulées' }]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };

  constructor(
    private appointmentService: AppointmentService,
    private coachService: CoachService,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.loadCounts();
    this.loadReservationsPerDay();
    this.loadCoachReservationStats();
    this.loadMonthlyReservations();
  }

  loadCounts() {
    this.coachService.getCoachList().subscribe((coachs: any[]) => {
      this.nb_Coachs = coachs.length;
    });

    this.patientService.getPatientList().subscribe((patients: any[]) => {
      this.nb_Patients = patients.length;
    });

    this.appointmentService.getAllAppointments().subscribe((rdvs: any[]) => {
      this.nb_Appointments = rdvs.length;
    });
  }

  loadReservationsPerDay() {
    this.appointmentService.getAllAppointments().subscribe((data: any[]) => {
      const countPerDay: { [date: string]: number } = {};
      data.forEach(res => {
        const date = new Date(res.date).toLocaleDateString();
        countPerDay[date] = (countPerDay[date] || 0) + 1;
      });
      this.reservationChartData = {
        labels: Object.keys(countPerDay),
        datasets: [{ data: Object.values(countPerDay), label: 'Réservations' }]
      };
    });
  }

  loadCoachReservationStats() {
    this.coachService.getCoachList().subscribe((coachs: any[]) => {
      const reserved = coachs.filter(c => c.availability && c.availability.length > 0).length;
      const notReserved = coachs.length - reserved;
      this.coachPieChartData = {
        labels: this.coachPieChartLabels,
        datasets: [{ data: [reserved, notReserved] }]
      };
    });
  }

  loadMonthlyReservations() {
    this.appointmentService.getAllAppointments().subscribe((data: any[]) => {
      const countPerMonth: { [month: string]: number } = {};

      data.forEach(res => {
        const month = new Date(res.date).toLocaleString('default', { month: 'short', year: 'numeric' });
        countPerMonth[month] = (countPerMonth[month] || 0) + 1;
      });

      this.lineChartData = {
        labels: Object.keys(countPerMonth),
        datasets: [{ data: Object.values(countPerMonth), label: 'Réservations Cumulées' }]
      };
    });
  }
}
