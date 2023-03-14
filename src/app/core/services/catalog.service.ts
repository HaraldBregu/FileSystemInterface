import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Catalog } from '../interfaces/catalog';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private url = "api/catalogs.json";

  constructor(private httpClient: HttpClient) {

  }

  getCatalogs(date: string): Observable<Catalog[]> {
    return this.httpClient.get<Catalog[]>(this.url).pipe(map(catalogs => {
      return catalogs.filter(e => e.date.includes(date));
    }))
  }

}
