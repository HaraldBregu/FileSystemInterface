import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Catalog } from '../interfaces/catalog';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {

  }

  get(): Observable<Catalog[]> {
    return this.httpClient.get<Catalog[]>(this.baseUrl);
  }

  getWithId(id: string): Observable<Catalog> {
    return this.httpClient.get<Catalog>(this.baseUrl + "/" + id);
  }

  search(string: string): Observable<Catalog> {
    return this.httpClient.get<Catalog>(this.baseUrl + "/" + string);
  }

}
