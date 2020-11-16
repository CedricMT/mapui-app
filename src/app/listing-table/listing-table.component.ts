import { Component, Input, OnInit } from '@angular/core';
import { DbDataSource } from 'src/app/common/datasources/db.datasource';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-listing-table',
  templateUrl: './listing-table.component.html',
  styleUrls: ['./listing-table.component.scss']
})
export class ListingTableComponent implements OnInit {
  @Input() collectionName: string;
  @Input() routerLinkBase: string;
  @Input() dataOptions: string;
  dataSource: DbDataSource;

  public displayedColumns;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log('loaded with dataSourceType: ', this.collectionName);
    this.dataSource = new DbDataSource(this.dataService, this.collectionName);
    this.displayedColumns = this.dataSource.columns;
  }

  public capitalizeFirstLetter(str: string) {
    return str.replace(/^./, str[0].toUpperCase());
  }
}
