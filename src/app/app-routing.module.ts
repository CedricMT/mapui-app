import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientPanelComponent } from './patient-panel/patient-panel.component';
import { DoctorPanelComponent } from './doctor-panel/doctor-panel.component';

const routes: Routes = [
  {
    path: 'patient',
    component: PatientPanelComponent
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
