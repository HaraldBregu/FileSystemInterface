import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { roles, rolesLoading } from '../store/selectors';
import { PartnerRole } from 'src/app/shared/interfaces/partner-role';
import { deleteRoleRegistryById, getRoleRegistry, getRoleRegistryById } from '../store/actions';
import { AlertButton, AlertButtonType } from 'src/app/shared/interfaces/alert-data';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDeleteAlertComponent } from 'src/app/shared/alerts/confirm-delete-alert/confirm-delete-alert.component';
import { ModalRoleComponent } from 'src/app/shared/modals/modal-role/modal-role.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-roles-registry',
  templateUrl: './roles-registry.component.html',
  styleUrls: ['./roles-registry.component.scss']
})
export class RolesRegistryComponent {
  @ViewChild('searchInput') searchInput: ElementRef = new ElementRef('')
  loading$ = this.store.pipe(select(rolesLoading))
  roles$ = this.store.pipe(select(roles))
  filteredRoles$ = this.roles$

  constructor(
    private store: Store,
    private dialog: MatDialog) {

  }

  getRoles() {
    this.store.dispatch(getRoleRegistry())
  }

  createRole() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '450px'
    this.dialog.open(ModalRoleComponent, dialogConfig)
  }

  editRole(role: PartnerRole) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '450px'
    dialogConfig.data = role
    this.dialog.open(ModalRoleComponent, dialogConfig)
    this.store.dispatch(getRoleRegistryById({ roleId: role.partner_role_id }))
  }

  deleteRole(role: PartnerRole) {
    if (!role.deletable) return

    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '450px'

    var actions: AlertButton[] = []
    actions.push({ type: AlertButtonType.DESCTRUCTIVE, text: "Delete" })
    actions.push({ type: AlertButtonType.DISMISS, text: "Cancel" })

    dialogConfig.data = {
      title: "Delete",
      description: "Are you sure you want to delete role id '" + role.partner_role_id + "'?",
      buttons: actions
    }

    const dialogRef = this.dialog.open(ConfirmDeleteAlertComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(data => {
      if (data.type === AlertButtonType.DESCTRUCTIVE)
        this.store.dispatch(deleteRoleRegistryById({ roleId: role.partner_role_id }))

    })
  }

  filterData($event: any) {
    const inputValue = $event.target.value
    this.filteredRoles$ = this.roles$
      .pipe(map(data => data
        .filter(content => content.partner_role_name.toLowerCase()
          .includes(inputValue.toLowerCase()))
      ))
  }

  clearFilteredData() {
    this.searchInput.nativeElement.value = ''
    this.filteredRoles$ = this.roles$
  }

}
