import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { roleOperationLoading, roleOperations } from '../store/selectors';
import { PartnerRoleOperation } from 'src/app/shared/interfaces/partner-role-operation';
import { AlertButtonType } from 'src/app/shared/interfaces/alert-data';
import { ConfirmDeleteAlertComponent } from 'src/app/shared/alerts/confirm-delete-alert/confirm-delete-alert.component';
import { deletePartnerRoleOperationById, getPartnerRoleOperations, getPartnerRoleOperationsById } from '../store/actions/role-operation';
import { ModalRoleOperationComponent } from 'src/app/shared/modals/modal-role-operation/modal-role-operation.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-partner-role-operation',
  templateUrl: './partner-role-operation.component.html',
  styleUrls: ['./partner-role-operation.component.scss']
})
export class PartnerRoleOperationComponent {
  @ViewChild('searchInput') searchInput: ElementRef = new ElementRef('')
  loading$ = this.store.pipe(select(roleOperationLoading))
  roleOperations$ = this.store.pipe(select(roleOperations))
  filteredRoleOperations$ = this.roleOperations$

  constructor(
    private store: Store,
    private dialog: MatDialog) {

  }

  getRoleOperations() {
    this.store.dispatch(getPartnerRoleOperations())
  }

  createRoleOperation() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '450px'
    dialogConfig.data = null
    this.dialog.open(ModalRoleOperationComponent, dialogConfig)
  }

  editRoleOperation(roleOperation: PartnerRoleOperation) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '450px'
    dialogConfig.data = roleOperation
    this.dialog.open(ModalRoleOperationComponent, dialogConfig)
    this.store.dispatch(getPartnerRoleOperationsById({ id: roleOperation.partner_role_operation_id }))
  }

  deleteRoleOperation(roleOperation: PartnerRoleOperation) {
    const dialogConfig = new MatDialogConfig()
    //dialogConfig.disableClose = true
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '450px'
    dialogConfig.data = {
      title: "Delete",
      description: "Are you sure you want to delete the role operation '" + roleOperation.partner_role_operation_id + "'?",
      buttons: [
        { type: AlertButtonType.DESCTRUCTIVE, text: "Delete" },
        { type: AlertButtonType.DISMISS, text: "Cancel" }
      ]
    }

    const dialogRef = this.dialog.open(ConfirmDeleteAlertComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(data => {
      if (data.type === AlertButtonType.DESCTRUCTIVE)
        this.store.dispatch(deletePartnerRoleOperationById({ id: roleOperation.partner_role_operation_id }))
    })

  }

  filterData($event: any) {
    const inputValue = $event.target.value
    this.filteredRoleOperations$ = this.roleOperations$
      .pipe(map(data => data
        .filter(content => content.partner_role_operation_description.toLowerCase()
          .includes(inputValue.toLowerCase()))
      ))
  }

  clearFilteredData() {
    this.searchInput.nativeElement.value = ''
    this.filteredRoleOperations$ = this.roleOperations$
  }

}
