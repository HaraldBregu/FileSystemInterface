import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductDetail } from '../interfaces/product-detail';
import { ProductAssociation } from '../interfaces/product-association';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  get(catalogName: string, categoryId?: number): Observable<Product[]> {
    var path = ""
    if (categoryId) {
      path = "/CommerceWebApi/Api/Catalog/GetCategoryElements?catalogName=" + catalogName + "&id=" + categoryId
    } else {
      path = "/CommerceWebApi/Api/Catalog/GetCatalogElements?catalogName=" + catalogName
    }
    return this.httpClient.get<Product[]>(path);
  }

  getProperties(catalogName: string, categoryId: number): Observable<ProductDetail> {
    var path = "/CommerceWebApi/Api/Catalog/GetEntityProperties?catalogName=" + catalogName + "&id=" + categoryId
    return this.httpClient.get<ProductDetail>(path);
  }

  saveProperties(data: any): Observable<any> {
    var path = "/CommerceWebApi/Api/Catalog/SaveEntityProperties"
    return this.httpClient.post<any>(path, data);
  }

  getAssociations(catalogName: string, categoryId: number): Observable<ProductAssociation> {
    var path = "/CommerceWebApi/Api/Catalog/GetEntityAssociations?catalogName=" + catalogName + "&id=" + categoryId
    return this.httpClient.get<ProductAssociation>(path);
  }

  saveAssociations(data: ProductAssociation): Observable<ProductAssociation> {
    var path = "/CommerceWebApi/Api/Catalog/SaveEntityAssociation"    
    return this.httpClient.post<ProductAssociation>(path, data);
  }

}
