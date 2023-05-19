import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(private httpClient: HttpClient) { }

  getEnvVariables(): Observable<any[]> {
    return this.httpClient.get<any[]>('/CommerceWebApi/Api/Catalog/GetEnvironments')
  }
}
