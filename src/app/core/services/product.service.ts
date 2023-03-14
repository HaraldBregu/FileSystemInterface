import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl)
  }

  getWithId(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrl + "/" + id);
  }

  search(string: string): Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrl + "/" + string);
  }

}
