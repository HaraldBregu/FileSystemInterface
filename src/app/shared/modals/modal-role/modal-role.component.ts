import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store, select } from '@ngrx/store';
import { rolesLoading, selectedRole } from 'src/app/modules/management/store/selectors';
import { saveRoleRegistry, updateRoleRegistry } from 'src/app/modules/management/store/actions';
import { PartnerRole } from '../../interfaces/partner-role';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-role',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './modal-role.component.html',
  styleUrls: ['./modal-role.component.scss']
})
export class ModalRoleComponent {
  @ViewChild('roleNameInput') roleNameInput: ElementRef = new ElementRef('')

  selectedRole$ = this.store.pipe(select(selectedRole))
  loading$ = this.store.pipe(select(rolesLoading))
  roleId = ''
  roleName = ''

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ModalRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: PartnerRole) {
  }

  close() {
    this.dialogRef.close()
  }

  changeRoleId($event: any) {
    this.roleId = $event.target.value
  }

  changeRoleName($event: any) {
    this.roleName = $event.target.value
  }

  createRole() {
    this.store.dispatch(saveRoleRegistry({
      role: {
        partner_role_id: this.roleId,
        partner_role_name: this.roleName,
        deletable: false
      }
    }))
    this.close()
  }

  updateRole(role: PartnerRole) {
    this.store.dispatch(updateRoleRegistry({
      role: {
        ...role,
        partner_role_name: this.roleNameInput.nativeElement.value
      }
    }))
    this.close()
  }

  disabled() {
    const editMode = this.data !== null && this.data !== undefined
    const hasAllFields = this.roleId === '' || this.roleName === ''
    const hasRoleName = this.roleName === ''
    return (hasAllFields && !editMode) || (hasRoleName && editMode)
  }

}
