import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DbDataSource } from 'src/app/common/datasources/db.datasource';
import { DataService } from '../services/data.service';
import { PatientFormComponent } from 'src/app/forms/patient-form/patient-form.component';

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

  constructor(public dialog: MatDialog, private dataService: DataService) { }

  ngOnInit() {
    this.dataSource = new DbDataSource(this.dataService, this.collectionName, this.filter);
    this.displayedColumns = this.dataSource.columns;
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
      mode: 'edit'
    });

    const dialogRef = this.dialog.open(PatientFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.update(this.collectionName, row.id, result)
        .subscribe((result) => {
          console.log(result);
          this.dataSource.loadData();
        });
    });
  }

  public delete(row) {
    console.log('Delete ', this.collectionName, ' with id: ', row.id);
    this.dataService.delete(this.collectionName, row.id)
      .subscribe((result) => {
        console.log(result);
        this.dataSource.loadData();
      });
  }
}
