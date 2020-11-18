import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DbDataSource } from 'src/app/common/datasources/db.datasource';
import { DataService } from '../services/data.service';
import { DbFormComponent } from 'src/app/forms/db-form/db-form.component';
import { Doctor } from '../common/interfaces/db/doctor.interface';

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

  private doctors: Array<Doctor>;
  public displayedColumns;

  constructor(public dialog: MatDialog, private dataService: DataService) { }

  ngOnInit() {
    this.dataSource = new DbDataSource(this.dataService, this.collectionName, this.filter);
    this.displayedColumns = this.dataSource.columns;
    if (this.collectionName == 'treatment') {
      this.loadDoctors();
    }
  }

  private loadDoctors() {
    this.dataService.getAll('doctor')
      .subscribe(doctors => this.doctors = doctors);
  }

  public capitalizeFirstLetter(str: string) {
    return str.replace(/^./, str[0].toUpperCase());
  }

  public edit(row) {
    this.openDialog(row);
  }

  private openDialog(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = Object.assign(row, {
      collectionName: this.collectionName,
      doctors: this.doctors,
      mode: 'edit'
    });

    const dialogRef = this.dialog.open(DbFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.update(this.collectionName, row.id, result)
        .subscribe(() => this.dataSource.loadData());
    });
  }

  public delete(row) {
    this.dataService.delete(this.collectionName, row.id)
      .subscribe(() => this.dataSource.loadData());
  }
}
