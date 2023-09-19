import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalOperationComponent } from '../../modals/modal-operation/modal-operation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertButton, AlertButtonType, AlertData } from '../../interfaces/alert-data';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent {
  AlertButtonType = AlertButtonType

  constructor(
    private dialogRef: MatDialogRef<ModalOperationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertData) { }

  clickButton(button: AlertButton) {
    this.dialogRef.close(button)
  }
}
