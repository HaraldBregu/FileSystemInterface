import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store, select } from '@ngrx/store';
import { operations, roleOperationLoading, roles, selectedRole, selectedRoleOperation } from 'src/app/modules/management/store/selectors';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartnerRoleOperation } from '../../interfaces/partner-role-operation';
import { getPartnerOperations, getPartnerRoles, savePartnerRoleOperation } from 'src/app/modules/management/store/actions';

@Component({
  selector: 'app-modal-role-operation',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './modal-role-operation.component.html',
  styleUrls: ['./modal-role-operation.component.scss']
})
export class ModalRoleOperationComponent {
  @ViewChild('operationDescriptionInput') operationDescriptionInput: ElementRef = new ElementRef('')
  @ViewChild('meteringBoundayInput') meteringBoundayInput: ElementRef = new ElementRef('')
  partnerRoles$ = this.store.pipe(select(roles))
  partnerOperations$ = this.store.pipe(select(operations))

  currentRoleOperation$ = this.store.pipe(select(selectedRoleOperation))
  loading$ = this.store.pipe(select(roleOperationLoading))

  canSave = false
  selectedRoleId = ''
  selectedOperationId = ''

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ModalRoleOperationComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: PartnerRoleOperation) {

      this.currentRoleOperation$.subscribe(data => {
        this.selectedRoleId = data?.partner_role_id ?? ''
        this.selectedOperationId = data?.partner_operation_id ?? ''
      })
  }

  close() {
    this.dialogRef.close()
  }

  saveOperation(operation: PartnerRoleOperation | undefined) {
   // console.log(this.selectedRoleId)

    //return
    if (!this.canSave)
      return

    this.dialogRef.close()

    this.store.dispatch(savePartnerRoleOperation({
      roleOperation: {
        ...operation,
        partner_role_operation_id: operation?.partner_role_operation_id ?? '',
        partner_role_id: this.selectedRoleId,
        partner_operation_id: this.selectedOperationId,
        partner_role_operation_description: this.operationDescriptionInput.nativeElement.value,
        partner_role_operation_metering_boundary: this.meteringBoundayInput.nativeElement.value,
      }
    }))
  }

  changeOperationDescription($event: any) {
    this.updateSaveButton()
  }

  selectRole($event: any) {
    const value = $event.target.value
    this.selectedRoleId = value;
    this.updateSaveButton()
  }

  loadRoles($event: any) {
    this.store.dispatch(getPartnerRoles())
  }

  selectOperation($event: any) {
    const value = $event.target.value
    this.selectedOperationId = value
    this.updateSaveButton()
  }

  loadOperations($event: any) {
    this.store.dispatch(getPartnerOperations())
  }

  changeMeteringBoundary($event: any) {
    this.updateSaveButton()
  }

  updateSaveButton() {
    const hasOperationDescription = this.operationDescriptionInput.nativeElement.value.length > 0
    const validOperationDescription = hasOperationDescription

    const hasSelectedRoleId = this.selectedRoleId.length > 0
    const selectedRoleIdNotNull = this.selectedRoleId !== 'NOVALUE000'
    const validRoleId = hasSelectedRoleId && selectedRoleIdNotNull

    const hasSelectedOperationId = this.selectedOperationId.length > 0
    const selectedOperationIdNotNull = this.selectedOperationId !== 'NOVALUE000'
    const validOperationId = hasSelectedOperationId && selectedOperationIdNotNull

    const hasMeteringBounday = this.meteringBoundayInput.nativeElement.value.length > 0
    const validMeteringBounday = hasMeteringBounday

    this.canSave = validOperationDescription && validRoleId && validOperationId && validMeteringBounday
  }

}
