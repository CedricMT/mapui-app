import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { finalize, map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { DataService } from '../services/data.service';

import { Patient } from 'src/app/interfaces/patient.interface';

export class ListingTableDataSource extends DataSource<Patient> {
  private patientSubject = new BehaviorSubject<Patient[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public columns: Array<String>;
  public loading$ = this.loadingSubject.asObservable();

  constructor(private type: String, private dataService: DataService) {
    super();
    switch (type) {
      case 'Patient':
        this.columns = ['id', 'firstName', 'lastName', 'sex', 'age', 'drugs', 'treatments'];
        break;

      default:
        break;
    }
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Patient[]> {
    return this.patientSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.patientSubject.complete();
    this.loadingSubject.complete();
  }

  loadData() {
    this.loadingSubject.next(true);

    this.dataService.getAll()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(data => {
        this.columns = data.length > 0 ? Object.keys(data[0]) : [];
        this.patientSubject.next(data);
      });
  }
}
