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
    return this.httpClient
      .get<Catalog[]>(path)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCatalogElements(catalogName: string): Observable<Category[]> {
    var path = "/CommerceWebApi/Api/Catalog/GetCatalogElements?catalogName=" + catalogName //CCN_NAVE
    return this.httpClient
      .get<Category[]>(path)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
