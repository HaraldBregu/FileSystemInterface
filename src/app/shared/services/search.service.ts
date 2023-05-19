import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchData } from '../interfaces/search-data';
import { Observable } from 'rxjs';
import { SearchDataResult } from '../interfaces/search-data-result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  get(catalogName?: string, categoryId?: number): Observable<SearchData> {
    const baseUrl = "/CommerceWebApi/Api/Catalog/GetSearch"
    if (catalogName && categoryId) {
      var path = baseUrl + "?catalogName=" + catalogName + "&id=" + categoryId
      return this.httpClient.get<SearchData>(path);
    }

    return this.httpClient.get<SearchData>(baseUrl);
  }

  getResult(searchData: SearchData): Observable<SearchDataResult[]> {
    const path = "/CommerceWebApi/Api/Catalog/GetResults"
    return this.httpClient.post<SearchDataResult[]>(path, searchData);
  }
}
