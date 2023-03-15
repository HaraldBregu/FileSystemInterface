import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private loginUrl = this.baseUrl + "/login";

  constructor(private httpClient: HttpClient) { }

  get token(): any {
    return localStorage.getItem("auth_token");
  }

  /*



  */
  login(username: string, password: string): Observable<User> {
    return this.httpClient.post<User>(this.loginUrl, {
      username: username,
      password: password
    }).pipe((data) => {
      return data;
    });
  }

  logout() {

  }

}
