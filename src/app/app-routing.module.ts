import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListcoachComponent } from './listcoach/listcoach.component';
import { PatientComponent } from './patient/patient.component';
import { SpecialityComponent } from './speciality/speciality.component';
import { RegisterComponent } from './register/register.component';
import { PilatesBookingComponent } from './pilates-booking/pilates-booking.component';
import { ReservedCoachesComponent } from './reserved-coaches/reserved-coaches.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', 
    pathMatch: 'full', 
    component: LoginComponent
  },
  {
    path: 'listcoach',
    pathMatch: 'full',
    component: ListcoachComponent
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'member',
    pathMatch: 'full',
    component: PatientComponent
  },
  {
    path: 'speciality',
    pathMatch: 'full',
    component: SpecialityComponent
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent
  },
  {
    path: 'book-pilates',  // Route principale pour book-pilates
    pathMatch: 'full',
    component: PilatesBookingComponent
  },
  { path: 'reserved-coaches', 
    pathMatch: 'full', 
    component: ReservedCoachesComponent 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
