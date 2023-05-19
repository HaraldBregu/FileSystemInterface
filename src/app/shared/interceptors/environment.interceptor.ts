import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalService } from '../services/local.service';

@Injectable()
export class EnvironmentInterceptor implements HttpInterceptor {

  constructor(private localService: LocalService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Exclude (GetEnvironments) API
    const reqUrl = request.url.toString()
    if (reqUrl.indexOf("GetEnvironments") >= 0) {
      return next.handle(request)
    }

    const currEnv = this.localService.getEnvironment() ?? ""

    const modifiedReq = request.clone({
      headers: request.headers.set('api_env', currEnv),
    })

    return next.handle(modifiedReq)
  }

}
