import { Component, Input, OnInit } from '@angular/core';
import { DbDataSource } from 'src/app/common/datasources/db.datasource';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-listing-table',
  templateUrl: './listing-table.component.html',
  styleUrls: ['./listing-table.component.scss']
})
export class ListingTableComponent implements OnInit {
  @Input() routerLinkBase: string;
  @Input() collectionName: string;
  @Input() filter: any;
  dataSource: DbDataSource;

  public displayedColumns;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataSource = new DbDataSource(this.dataService, this.collectionName, this.filter);
    this.displayedColumns = this.dataSource.columns;
  }

  public capitalizeFirstLetter(str: string) {
    return str.replace(/^./, str[0].toUpperCase());
  }

  public edit(row) {
    console.log('Edit row in ', this.collectionName, ' with: ', row);
  }

  public delete(row) {
    console.log('Delete ', this.collectionName, ' with id: ', row.id);
  }
}
