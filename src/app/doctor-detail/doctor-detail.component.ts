import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DbDataSource } from 'src/app/common/datasources/db.datasource';
import { DataService } from 'src/app/services/data.service';
import { Doctor } from 'src/app/common/interfaces/db/doctor.interface';
import { Treatment } from 'src/app/common/interfaces/db/treatment.interface';
import { Patient } from 'src/app/common/interfaces/db/patient.interface';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit {
  public dataSource: DbDataSource;
  public displayedColumns;
  public doctor: Doctor;
  public patientFilter;
  public treatmentFilter;
  public dbDataLoaded: boolean = false;

  private id: string;
  private collectionName: string;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    route.data.pipe(map(d => d.collection))
      .subscribe(collection => {
        this.collectionName = collection;
      });

    route.params.pipe(map(p => p.id))
      .subscribe(id => this.id = id);
  }

  ngOnInit() {
    // TODO: Change to request using appopriate mongodb
    // ==>
    this.dataService.getById(this.collectionName, this.id).toPromise()
      .then(doctor => {
        this.doctor = doctor;
        return this.dataService.getAll('treatment').toPromise();
      })
      .then((treatments: Array<Treatment>) => {
        const treatmentIds = treatments
          .filter((treatment: any) => treatment.doctor._id == this.doctor.id)
          .map(treatment => treatment.id);
        this.treatmentFilter = { ids: treatmentIds };
      })
      .then(() => {
        return this.dataService.getAll('patient').toPromise();
      })
      .then((patients: Array<Patient>) => {
        const patientIds = patients
          .filter((patient: any) => {
            let flag = false;
            this.treatmentFilter.ids.forEach(treatmentId => {
              if (patient.treatments.find(id => id == treatmentId)) {
                flag = true;
              }
            });
            return flag;
          })
          .map(patient => patient.id);
        this.patientFilter = { ids: patientIds };
        this.dbDataLoaded = true;
      });
    // <==
  };

  public capitalizeFirstLetter(str: string) {
    return str.replace(/^./, str[0].toUpperCase());
  }
}