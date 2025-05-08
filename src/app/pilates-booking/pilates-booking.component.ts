import { Component } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { AuthService } from '../services/AuthService';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pilates-booking',
  templateUrl: './pilates-booking.component.html',
  styleUrls: ['./pilates-booking.component.scss']
})
export class PilatesBookingComponent {
  selectedDate!: Date;
  selectedTime!: string;
  selectedCoach!: number;
  availableCoaches: any[] = [];
  patientId: string = '';
  minDate: string;

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private router: Router
  ) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
  }

  // Récupérer les coachs disponibles
  checkAvailableCoachs() {
    if (!this.selectedDate || !this.selectedTime) {
      return;
    }

    const dateTime = this.combineDateAndTime(this.selectedDate, this.selectedTime);

    this.appointmentService.getAvailableCoachs().subscribe((coachs) => {
      this.availableCoaches = coachs; // Afficher les coachs disponibles
    });
  }

  // Vérifier la disponibilité du coach à la date et l'heure sélectionnées
  checkCoachAvailability(dateTime: string, coachId: number): Observable<boolean> {
    return this.appointmentService.isCoachAvailable(dateTime, coachId);
  }

  async bookAppointment() {
    const selectedTimestamp = new Date(this.selectedDate).getTime();
    const minTimestamp = new Date(this.minDate).getTime();
  
    if (selectedTimestamp < minTimestamp) {
      alert('❌ Please select a date from tomorrow onwards.');
      return;
    }
  
    if (!this.selectedDate || !this.selectedTime || !this.selectedCoach) {
      alert('❌ Please select a date, time, and coach.');
      return;
    }
  
    // Vérification : l'heure doit être entre 6h et 15h
    const [hours, minutes] = this.selectedTime.split(':').map(Number);
    if (hours < 6 || hours > 15) {
      alert('❌ Please select a time between 6:00 AM and 3:00 PM.');
      return;
    }
  
    const dateTime = this.combineDateAndTime(this.selectedDate, this.selectedTime);
  
    // Vérification coach disponible
    const isCoachAvailable = await this.checkCoachAvailability(dateTime, this.selectedCoach).toPromise();
  
    if (!isCoachAvailable) {
      alert('❌ The selected coach is already booked at the chosen date and time.');
      return;
    }
  
    const currentUserId = await this.authService.getCurrentUserId();
    if (!currentUserId) {
      console.error('Patient ID is invalid');
      alert('❌ Failed to retrieve patient ID');
      return;
    }
  
    this.patientId = currentUserId;
  
    // Réserver le rendez-vous
    this.appointmentService.book({
      date: dateTime, // string ISO
      coachId: this.selectedCoach,
      patientId: this.patientId
    })
    .subscribe(() => {
      alert('✅ Appointment booked successfully!');
    }, (error) => {
      console.error('Booking failed:', error);
      alert('❌ Failed to book appointment');
    });
  }

  // Combiner la date et l'heure pour obtenir un datetime ISO
  combineDateAndTime(date: Date, time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);
    return combined.toISOString(); // format standard pour envoyer au backend
  }
  logout() {
    this.authService.signOut().then(() => {
      console.log("Déconnexion réussie.");
      this.router.navigate(['']);
    }).catch(error => {
      console.error("Erreur de déconnexion: ", error);
    });
  }
}