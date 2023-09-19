import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store, select } from '@ngrx/store';
import { currentOperation, operationLoading } from 'src/app/modules/management/store/selectors';
import { PartnerOperation } from '../../interfaces/partner-operation';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { savePartnerOperation } from 'src/app/modules/management/store/actions';

@Component({
  selector: 'app-modal-operation',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './modal-operation.component.html',
  styleUrls: ['./modal-operation.component.scss']
})
export class ModalOperationComponent {
  @ViewChild('operationNameInput') operationNameInput: ElementRef = new ElementRef('')
  @ViewChild('requiredAgencyCheckbox') requiredAgencyCheckbox: ElementRef = new ElementRef('')

  currentOperation$ = this.store.pipe(select(currentOperation))
  loading$ = this.store.pipe(select(operationLoading))
  canSave = false

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ModalOperationComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: PartnerOperation) {

  }

  close() {
    this.dialogRef.close()
  }

  saveOperation(operation: PartnerOperation | undefined) {
    if (!this.canSave)
      return

    this.dialogRef.close()

    this.store.dispatch(savePartnerOperation({
      operation: {
        partner_operation_id: operation?.partner_operation_id ?? '',
        partner_operation_name: this.operationNameInput.nativeElement.value,
        require_agency: this.requiredAgencyCheckbox.nativeElement.checked,
        deletable: true,
      }
    }))
  }

  changeNameOperation($event: any) {
    const value = $event.target.value
    this.canSave = value.length > 0
  }

  checkRequireAgency($event: any) {
    const value = this.operationNameInput.nativeElement.value
    this.canSave = value.length > 0
  }

}
