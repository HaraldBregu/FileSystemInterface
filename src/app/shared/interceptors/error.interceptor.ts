import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertButtonType } from '../interfaces/alert-data';
import { ErrorAlertComponent } from '../alerts/error-alert/error-alert.component';
import { ErrorAlertService } from '../services/error-alert.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public errorAlertService: ErrorAlertService, private dialog: MatDialog) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(this.handleError))
  }

  handleError(error: any) {
    let errorMessage = ''

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      if (error.status === 404) {
        errorMessage = `${error.error.message}`
      } else {
        errorMessage = `${error.statusText}\n${error.error.ExceptionMessage}`
      }
    }

    window.alert(errorMessage)

    /*
    this.errorAlertService.openDialog({
      title: "Error",
      description: errorMessage,
      buttons: [{
        type: AlertButtonType.DISMISS,
        text: "Close"
      }]
    })
    */

   // this.dialog.open(ErrorAlertComponent)


    /* this.dialog.open(ErrorAlertComponent, {
       position: { top: '30px', bottom: '30px' },
       width: '450px',
       data: {
         title: "Error",
         description: errorMessage,
         buttons: [{
           type: AlertButtonType.DISMISS,
           text: "Close"
         }]
       },
     })*/

    //alert(errorMessage)

    return throwError(() => errorMessage)
  }

}
