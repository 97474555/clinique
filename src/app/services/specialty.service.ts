import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app-config';
import { Speciality } from '../modal/speciality';


@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  tab:Speciality[]=GLOBAL._DB.specialties;
  constructor(private _http: HttpClient) {}

  addS(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/specialties', data);
  }

  updateS(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/specialties/${id}`, data);
  }

  getSList(): Observable<any> {
    return this._http.get('http://localhost:3000/specialties');
  }

  deleteS(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/specialties/${id}`);
  }

}