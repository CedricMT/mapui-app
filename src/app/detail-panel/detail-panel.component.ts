import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DbDataSource } from 'src/app/common/datasources/db.datasource';
import { DataService } from 'src/app/services/data.service';
import { Patient } from '../common/interfaces/db/patient.interface';

@Component({
  selector: 'app-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss']
})
export class DetailPanelComponent implements OnInit {
  public dataSource: DbDataSource;
  public displayedColumns;
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

    this.dataService.get(this.collectionName, this.id)
      .subscribe(patient => this.patient = patient);
    // this.dataSource = new DbDataSource(this.dataService, this.collectionName, this.id);
    // this.displayedColumns = this.dataSource.columns;
  }

  public capitalizeFirstLetter(str: string) {
    return str.replace(/^./, str[0].toUpperCase());
  }

}
