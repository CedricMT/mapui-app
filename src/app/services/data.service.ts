import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
    'Access-Control-Allow-Origin': '*'
  });

  validCollections: Array<string> = ['patient', 'doctor', 'drug', 'treatment'];

  constructor(private http: HttpClient) { }

  getAll(collection: string,): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.get(baseUrl + collection, { headers: this.headers });
  }

  getById(collection: string, id): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.get(`${baseUrl}${collection}/id/${id}`);
  }

  getByIds(collection: string, filter): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.get(`${baseUrl}${collection}/ids`, { params: filter });
  }

  get(collection: string, filter): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.get(`${baseUrl}${collection}`, { params: filter });
  }

  create(collection: string, data): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.post(baseUrl + collection, data);
  }

  update(collection: string, id, data): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.put(`${baseUrl}${collection}/${id}`, data);
  }

  delete(collection: string, id): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.delete(`${baseUrl}${collection}/${id}`);
  }

  deleteAll(collection: string): Observable<any> {
    if (!this.isCollectionValid(collection)) {
      throw new Error('Cannot request db due to invalid collection');
    }
    return this.http.delete(baseUrl + collection);
  }

  isCollectionValid(collection: string): boolean {
    return this.validCollections.find(validCollection => validCollection = collection) ? true : false;
  }
}
