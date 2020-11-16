import { Component, OnInit } from '@angular/core';
import { ListingTableDataSource } from './listing-table-datasource';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-listing-table',
  templateUrl: './listing-table.component.html',
  styleUrls: ['./listing-table.component.scss']
})
export class ListingTableComponent implements OnInit {
  dataSource: ListingTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataSource = new ListingTableDataSource('Patient', this.dataService);
    this.displayedColumns = this.dataSource.columns;
    this.dataSource.loadData();
  }
}
