import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { coach } from '../modal/coach';
import { GLOBAL } from 'src/app-config';

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  
  tab: coach[] = GLOBAL._DB.coachs;

  constructor(private _http: HttpClient) {}

  addCoach(data: any): Observable<any> {
    return this._http.post(`http://localhost:3000/coachs`, data);
  }

  updateCoach(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/coachs/${id}`, data);
  }

  getCoachList(): Observable<any> {
    return this._http.get('http://localhost:3000/coachs');
  }

  deleteCoach(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/coachs/${id}`);
  }

  // 🚩 Nouvelle méthode pour récupérer SEULEMENT les coachs réservés
  getReservedCoaches(): Observable<coach[]> {
    return this.getCoachList().pipe(
      map((coachs: coach[]) => coachs.filter(c => c.availability && c.availability.length > 0))
    );
  }
}
