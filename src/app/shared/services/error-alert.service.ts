import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ErrorAlertComponent } from '../alerts/error-alert/error-alert.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorAlertService {

  public isDialogOpen: Boolean = false;
  constructor(public dialog: MatDialog) { }

  openDialog(data: any): any {
    if (this.isDialogOpen)
      return false

      

    this.isDialogOpen = true

    const dialogRef = this.dialog.open(ErrorAlertComponent, {
      position: { top: '30px', bottom: '30px' },
      width: '450px',
      data: data
      /*{
        title: "Error",
        description: errorMessage,
        buttons: [{
          type: AlertButtonType.DISMISS,
          text: "Close"
        }]
      },*/
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      this.isDialogOpen = false
      //let animal
      //animal = result
    })

  }

}
