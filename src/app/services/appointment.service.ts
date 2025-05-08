import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Récupérer tous les coachs disponibles (optionnel : peut être filtré côté backend)
  getAvailableCoachs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/coachs`);
  }

  // Vérifier si un coach est dispo à une date/heure
  isCoachAvailable(dateTime: string, coachId: number): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments?coachId=${coachId}&date=${dateTime}`).pipe(
      map(appointments => appointments.length === 0) // dispo si aucune réservation à cette date
    );
  }

  // Réserver le rendez-vous
  book(appointment: { date: string; coachId: number; patientId: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/appointments`, appointment);
  }

  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments`);
  }
  
}
