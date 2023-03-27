import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetail } from '../interfaces/product-detail';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  get(catalogName: string, categoryId: number): Observable<ProductDetail> {
    var path = "/CommerceWebApi/Api/Catalog/GetEntityProperties?catalogName=" + catalogName + "&id=" + categoryId
    return this.httpClient.get<ProductDetail>(path);
  }

}
