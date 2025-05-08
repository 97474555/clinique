import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoachService } from './services/coach.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {

  title="Polyclinic";
  constructor(private _dialog : MatDialog , private _coaService : CoachService){}

  
 
}
