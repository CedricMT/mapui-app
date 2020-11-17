import { Component } from '@angular/core';
import { PatientFormComponent } from 'src/app/patient-form/patient-form.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-patient-panel',
  templateUrl: './patient-panel.component.html',
  styleUrls: ['./patient-panel.component.scss']
})
export class PatientPanelComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(PatientFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result', result);
    });
  }
}