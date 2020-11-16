import { DataSource } from '@angular/cdk/collections';
import { finalize } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { DataService } from '../../services/data.service';

import { Doctor } from 'src/app/common/interfaces/db/doctor.interface';
import { Patient } from 'src/app/common/interfaces/db/patient.interface';
import { Drug } from 'src/app/common/interfaces/db/drug.interface';
import { Treatment } from 'src/app/common/interfaces/db/treatment.interface';

export class DbDataSource extends DataSource<Patient> {
  private dataSubject;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public columns: Array<String>;
  public loading$ = this.loadingSubject.asObservable();

  constructor(private dataService: DataService, private collectionName: string, private id?: string) {
    super();
    switch (collectionName) {
      case 'patient':
        this.columns = ['firstName', 'lastName', 'sex', 'age', 'drugs', 'treatments'];
        this.dataSubject = new BehaviorSubject<Patient[]>([]);
        break;

      case 'doctor':
        this.columns = ['firstName', 'lastName', 'speciality'];
        this.dataSubject = new BehaviorSubject<Doctor[]>([]);
        break;

      case 'drug':
        this.columns = ['name', 'code'];
        this.dataSubject = new BehaviorSubject<Drug[]>([]);
        break;

      case 'treatment':
        this.columns = ['start', 'end', 'doctor'];
        this.dataSubject = new BehaviorSubject<Treatment[]>([]);
        break;

      default:
        console.error('Input \'dataSourceType\' not valid!')
        break;
    }

    if (id) {
      this.loadData(id);
    } else {
      this.loadData();
    }
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

  loadData(id?: string) {
    let request;
    this.loadingSubject.next(true);

    if (id) {
      request = this.dataService.get(this.collectionName, id);
    } else {
      request = this.dataService.getAll(this.collectionName)
    }
    
    request
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(data => {
        console.log('retrieved data: ', data);
        this.dataSubject.next(data);
      });
  }
}
