import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Product[]> {
    var path = "/CommerceWebApi/Api/Catalog/GetCatalogList"
    return this.httpClient.get<Product[]>(path)
  }

}
