import { DataSource } from '@angular/cdk/collections';
import { finalize } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { DataService } from '../services/data.service';

import { Doctor } from 'src/app/interfaces/doctor.interface';
import { Patient } from 'src/app/interfaces/patient.interface';

export class ListingTableDataSource extends DataSource<Patient> {
  private dataSubject;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private dbCollection: string;

  public columns: Array<String>;
  public loading$ = this.loadingSubject.asObservable();

  constructor(private type: String, private dataService: DataService) {
    super();
    switch (type) {
      case 'Patient':
        this.dbCollection = 'patient';
        this.columns = ['id', 'firstName', 'lastName', 'sex', 'age', 'drugs', 'treatments'];
        this.dataSubject = new BehaviorSubject<Patient[]>([]);
        break;

        case 'Doctor':
        this.dbCollection = 'doctor';
        this.columns = ['id', 'firstName', 'lastName', 'speciality'];
        this.dataSubject = new BehaviorSubject<Doctor[]>([]);
        break;

      default:
        console.error('Input \'dataSourceType\' not valid!')
        break;
    }

    this.loadData();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Patient[]> {
    return this.dataSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  loadData() {
    this.loadingSubject.next(true);

    this.dataService.getAll(this.dbCollection)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(data => {
        this.dataSubject.next(data);
      });
  }
}
