import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Catalog } from '../interfaces/catalog';
import { Category } from '../interfaces/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = "api/categories.json";

  constructor(private httpClient: HttpClient) {

  }

  getCategories(catalog: Catalog, category: Category): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url)
  }

}
