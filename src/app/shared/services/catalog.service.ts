import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductDetail } from '../interfaces/product-detail';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Product[]> {
    var path = "/CommerceWebApi/Api/Catalog/GetCatalogList"
    return this.httpClient.get<Product[]>(path)
  }

  getProperties(catalogName: string): Observable<ProductDetail> {
    var path = "/CommerceWebApi/Api/Catalog/GetCatalogProperties?catalogName=" + catalogName
    return this.httpClient.get<ProductDetail>(path);
  }

}
