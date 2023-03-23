import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {}

  get(catalogName: string, categoryId?: number): Observable<Product[]> {
    var path = ""
    if (categoryId) {
      path = "/CommerceWebApi/Api/Catalog/GetCategoryElements?catalogName=" + catalogName + "&id=" + categoryId
    } else {
      path = "/CommerceWebApi/Api/Catalog/GetCatalogElements?catalogName=" + catalogName
    }
    return this.httpClient.get<Product[]>(path);
  }

}
