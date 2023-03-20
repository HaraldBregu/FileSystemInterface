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
      path = "/CommerceWebApi/Api/Catalog/GetCatalogElements?catalogName=" + catalogName //CCN_NAVE
    }
    return this.httpClient.get<Category[]>(path).pipe(retry(1), catchError(this.handleError));
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
