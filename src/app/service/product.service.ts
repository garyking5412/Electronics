import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getFromApi(url: string): Observable<any> {
    return this.http.get(url);
  }
  postToApi(url: string, entity: any): Observable<any> {
    return this.http.post(url, entity);
  }
  putToApi(url: string, id: any): Observable<any> {
    return this.http.put(url, id);
  }
  deleteFromApi(url: string): Observable<any> {
    return this.http.delete(url);
  }
}
