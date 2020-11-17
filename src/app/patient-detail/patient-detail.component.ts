import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DbDataSource } from 'src/app/common/datasources/db.datasource';
import { DataService } from 'src/app/services/data.service';
import { Patient } from '../common/interfaces/db/patient.interface';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  public dataSource: DbDataSource;
  public displayedColumns;
  public dbDataLoaded: boolean = false;
  public treatmentFilter;
  public drugFilter;
  public patient: Patient;

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
    this.dataService.getById(this.collectionName, this.id).toPromise()
      .then(patient => {
        this.patient = patient;
        this.drugFilter = { ids: this.patient.drugs };
        this.treatmentFilter = { ids: this.patient.treatments };
        this.dbDataLoaded = true;
      });
  }

  public capitalizeFirstLetter(str: string) {
    return str.replace(/^./, str[0].toUpperCase());
  }
}
