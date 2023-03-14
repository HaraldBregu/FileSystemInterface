import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class ResourcesInterceptor implements HttpInterceptor {

  constructor() {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({ url: `${environment.baseUrl}/${request.url}` });
    return next.handle(apiReq);
  }
}

export const ResourcesInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ResourcesInterceptor,
  multi: true,
};
