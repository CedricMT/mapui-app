import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DbDataSource } from 'src/app/common/datasources/db.datasource';
import { DataService } from 'src/app/services/data.service';
import { Doctor } from '../common/interfaces/db/doctor.interface';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit {
  public dataSource: DbDataSource;
  public displayedColumns;
  public doctor: Doctor;

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
    this.dataService.getById(this.collectionName, this.id)
      .subscribe(doctor => this.doctor = doctor);
  }

  public capitalizeFirstLetter(str: string) {
    return str.replace(/^./, str[0].toUpperCase());
  }

}
