import { Component, ViewChild } from '@angular/core';
import { PatientFormComponent } from 'src/app/patient-form/patient-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Patient } from '../common/interfaces/db/patient.interface';
import { ListingTableComponent } from '../listing-table/listing-table.component';

@Component({
  selector: 'app-patient-panel',
  templateUrl: './patient-panel.component.html',
  styleUrls: ['./patient-panel.component.scss']
})
export class PatientPanelComponent {
  @ViewChild(ListingTableComponent) listingTable: ListingTableComponent;

  constructor(public dialog: MatDialog, private dataService: DataService) { }

  openDialog() {
    const dialogRef = this.dialog.open(PatientFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.createPatient(Object.assign(result, { treatments: [], drugs: [] }));
    });
  }

  private createPatient(patient: Patient) {
    this.dataService.create('patient', patient)
      .subscribe(() => this.listingTable.dataSource.loadData());
  }
}