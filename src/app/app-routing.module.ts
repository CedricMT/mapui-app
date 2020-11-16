import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientPanelComponent } from './patient-panel/patient-panel.component';
import { DoctorPanelComponent } from './doctor-panel/doctor-panel.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'patient', pathMatch: 'full' },
  {
    path: 'patient',
    component: PatientPanelComponent
  },
  {
    path: 'patient/:id', component: PatientDetailComponent, data: { collection: 'patient' }
  },
  {
    path: 'doctor',
    component: DoctorPanelComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
