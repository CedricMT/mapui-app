import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DbDataSource } from 'src/app/common/datasources/db.datasource';
import { DataService } from 'src/app/services/data.service';
import { Doctor } from '../common/interfaces/db/doctor.interface';
import { Patient } from '../common/interfaces/db/patient.interface';
import { Treatment } from '../common/interfaces/db/treatment.interface';
import { DbFormComponent } from '../forms/db-form/db-form.component';
import { ListingTableComponent } from '../listing-table/listing-table.component';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  @ViewChild('treatmentListingTable') treatmentListingTable: ListingTableComponent;
  @ViewChild('drugListingTable') drugListingTable: ListingTableComponent;

  public dataSource: DbDataSource;
  public displayedColumns;
  public dbDataLoaded: boolean = false;
  public treatmentFilter;
  public drugFilter;
  public patient: Patient;
  public doctors: Array<Doctor>;

  private id: string;
  private collectionName: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    public dialog: MatDialog) {

    route.data.pipe(map(d => d.collection))
      .subscribe(collection => this.collectionName = collection);

    route.params.pipe(map(p => p.id))
      .subscribe(id => this.id = id);
  }

  ngOnInit() {
    this.loadPatient();
    this.loadDoctors();
  }

  private loadPatient() {
    this.dataService.getById(this.collectionName, this.id)
      .subscribe(patient => this.updatePatientInfo(patient));
  }

  private updatePatientInfo(patient: Patient) {
    this.patient = patient;
    this.drugFilter = { ids: this.patient.drugs };
    this.treatmentFilter = { ids: this.patient.treatments };
    this.dbDataLoaded = true;
  }

  private loadDoctors() {
    this.dataService.getAll('doctor')
      .subscribe(doctors => this.doctors = doctors);
  }

  public capitalizeFirstLetter(str: string) {
    return str.replace(/^./, str[0].toUpperCase());
  }

  public openFormDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = Object.assign({ doctors: this.doctors }, {
      collectionName: 'treatment',
      mode: 'create'
    });

    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(DbFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.createTreatment(result);
        }
      });
  }

  private createTreatment(treatment: Treatment) {
    this.dataService.create('treatment', treatment).toPromise()
      .then((treatmentResult: Treatment) => {
        this.patient.treatments.push(treatmentResult.id);
        return this.dataService.update('patient', this.patient.id, this.patient).toPromise();
      })
      .then(() => {
        this.loadPatient();
        this.treatmentListingTable.dataSource.loadData();
      });
  }
}
