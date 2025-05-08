import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './login/login.component';
import{MatCardModule} from '@angular/material/card';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

import { PatientComponent } from './patient/patient.component';
import { PatAddEditComponent } from './pat-add-edit/pat-add-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgChartsModule } from 'ng2-charts';
import { SpecialityComponent } from './speciality/speciality.component';
import { SpeAddEditComponent } from './spe-add-edit/spe-add-edit.component';
import { firebaseConfig } from './environment';
import { CoaAddEditComponent } from './coa-add-edit/coa-add-edit.component';
import { ListcoachComponent } from './listcoach/listcoach.component';
import { RegisterComponent } from './register/register.component';
import { PilatesBookingComponent } from './pilates-booking/pilates-booking.component';
import { ReservedCoachesComponent } from './reserved-coaches/reserved-coaches.component';



@NgModule({
  declarations: [
    AppComponent, 
  LoginComponent,
  SidenavComponent,

  PatientComponent,
  PatAddEditComponent,
  SpecialityComponent,
  SpeAddEditComponent,
  CoaAddEditComponent,
  ListcoachComponent,
  RegisterComponent,
  PilatesBookingComponent,
  ReservedCoachesComponent,
  DashboardComponent
  ],

    
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    AngularFireModule,
    AngularFireAuthModule,
    MatFormFieldModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule  ,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
     NgChartsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
