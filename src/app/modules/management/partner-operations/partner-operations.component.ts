import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { operationLoading, operations } from '../store/selectors';
import { deletePartnerOperationById, getPartnerOperationById, getPartnerOperations } from '../store/actions';
import { PartnerOperation } from 'src/app/shared/interfaces/partner-operation';
import { AlertButtonType } from 'src/app/shared/interfaces/alert-data';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ModalOperationComponent } from 'src/app/shared/modals/modal-operation/modal-operation.component';
import { ConfirmDeleteAlertComponent } from 'src/app/shared/alerts/confirm-delete-alert/confirm-delete-alert.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-partner-operations',
  templateUrl: './partner-operations.component.html',
  styleUrls: ['./partner-operations.component.scss']
})
export class PartnerOperationsComponent {
  @ViewChild('searchInput') searchInput: ElementRef = new ElementRef('')
  loading$ = this.store.pipe(select(operationLoading))
  operations$ = this.store.pipe(select(operations))
  filteredOperations$ = this.operations$

  constructor(
    private store: Store,
    private dialog: MatDialog) {

  }

  getOperations() {
    this.store.dispatch(getPartnerOperations())
  }

  createOperation() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '650px'
    dialogConfig.data = null
    this.dialog.open(ModalOperationComponent, dialogConfig)
  }

  editOperation(operation: PartnerOperation) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '650px'
    dialogConfig.data = operation
    this.dialog.open(ModalOperationComponent, dialogConfig)
    this.store.dispatch(getPartnerOperationById({ operationId: operation.partner_operation_id }))
  }

  deleteOperation(operation: PartnerOperation) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '450px'
    dialogConfig.data = {
      title: "Delete",
      description: "Are you sure you want to delete the operation '" + operation.partner_operation_name + "'?",
      buttons: [
        { type: AlertButtonType.DESCTRUCTIVE, text: "Delete" },
        { type: AlertButtonType.DISMISS, text: "Cancel" }
      ]
    }

    const dialogRef = this.dialog.open(ConfirmDeleteAlertComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(data => {
      if (data.type === AlertButtonType.DESCTRUCTIVE)
        this.store.dispatch(deletePartnerOperationById({ operationId: operation.partner_operation_id }))
    })
  }

  filterData($event: any) {
    const inputValue = $event.target.value
    this.filteredOperations$ = this.operations$
      .pipe(map(data => data
        .filter(content => content.partner_operation_name.toLowerCase()
          .includes(inputValue.toLowerCase()))
      ))
  }

  clearFilteredData() {
    this.searchInput.nativeElement.value = ''
    this.filteredOperations$ = this.operations$
  }

}
