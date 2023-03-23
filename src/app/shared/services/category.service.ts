import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Catalog } from '../interfaces/catalog';
import { Category } from '../interfaces/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {}

  get(catalogName: string, categoryId?: number): Observable<Category[]> {
    var path = ""
    if (categoryId) {
      path = "/CommerceWebApi/Api/Catalog/GetCategoryElements?catalogName=" + catalogName + "&id=" + categoryId
    } else {
      path = "/CommerceWebApi/Api/Catalog/GetCatalogElements?catalogName=" + catalogName
    }
    return this.httpClient.get<Category[]>(path);
  }

}
