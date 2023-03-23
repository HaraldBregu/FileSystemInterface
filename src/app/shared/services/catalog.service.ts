import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Catalog } from '../interfaces/catalog';
import { Category } from '../interfaces/category';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Catalog[]> {
    var path = "/CommerceWebApi/Api/Catalog/GetCatalogList"
    return this.httpClient.get<Catalog[]>(path)
  }

}
