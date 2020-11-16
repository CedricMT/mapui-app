import { Component, Input, OnInit } from '@angular/core';
import { ListingTableDataSource } from './listing-table-datasource';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-listing-table',
  templateUrl: './listing-table.component.html',
  styleUrls: ['./listing-table.component.scss']
})
export class ListingTableComponent implements OnInit {
  @Input() dataSourceType: string;
  dataSource: ListingTableDataSource;

  public displayedColumns;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log('loaded with dataSourceType: ', this.dataSourceType);
    this.dataSource = new ListingTableDataSource(this.dataSourceType, this.dataService);
    this.displayedColumns = this.dataSource.columns;
  }

  public capitalizeFirstLetter(str: string) {
    return str.replace(/^./, str[0].toUpperCase());
  }
}
