import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl: string;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
    'Access-Control-Allow-Origin': '*'
  });

  validCollections: Array<string> = ['patient', 'doctor', 'drug', 'treatment'];

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  getAll(collection: string,): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.get(this.apiUrl + collection, { headers: this.headers });
  }

  getById(collection: string, id): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.get(`${this.apiUrl}${collection}/id/${id}`);
  }

  getByIds(collection: string, filter): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.get(`${this.apiUrl}${collection}/ids`, { params: filter });
  }

  get(collection: string, filter): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.get(`${this.apiUrl}${collection}`, { params: filter });
  }

  create(collection: string, data): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.post(this.apiUrl + collection, data);
  }

  update(collection: string, id, data): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.put(`${this.apiUrl}${collection}/${id}`, data);
  }

  delete(collection: string, id): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.delete(`${this.apiUrl}${collection}/${id}`);
  }

  deleteAll(collection: string): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.delete(this.apiUrl + collection);
  }

  isCollectionValid(collection: string): boolean {
    return this.validCollections.find(validCollection => validCollection = collection) ? true : false;
  }
}
