import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { DoctorPanelComponent } from './doctor-panel/doctor-panel.component';
import { ListingTableComponent } from './listing-table/listing-table.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PatientPanelComponent } from './patient-panel/patient-panel.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { DbFormComponent } from './forms/db-form/db-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    NavbarComponent,
    PatientPanelComponent,
    DoctorPanelComponent,
    ListingTableComponent,
    PatientDetailComponent,
    DoctorDetailComponent,
    DbFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    HttpClientModule,
    MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
