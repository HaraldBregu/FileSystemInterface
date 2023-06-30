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

}
