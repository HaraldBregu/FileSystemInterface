import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { allOrganizations, organizationLoading } from 'src/app/modules/management/store/selectors';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Organization } from '../../interfaces/organization';
import { addOrganisationIds, getAllOrganizations, getAllOrganizationsByPartnerId } from 'src/app/modules/management/store/actions';
import { MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-organisations',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './modal-organisations.component.html',
  styleUrls: ['./modal-organisations.component.scss']
})
export class ModalOrganisationsComponent {
  @ViewChild('searchNameInput') searchNameInput: ElementRef = new ElementRef('')
  @ViewChild('searchCompanyNameInput') searchCompanyNameInput: ElementRef = new ElementRef('')

  allOrganizations$ = this.store.pipe(select(allOrganizations))
  organizationsLoading$ = this.store.pipe(select(organizationLoading))
  selectedOrganisationIds: string[] = []

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ModalOrganisationsComponent>) {
  }


  close() {
    this.dialogRef.close()
    this.selectedOrganisationIds = []
  }

  selectOrganisation(organization: Organization) {
    if (organization.associated)
      return

    const selectedId = organization.org_id
    const index = this.selectedOrganisationIds.indexOf(selectedId)
    if (index > -1) {
      this.selectedOrganisationIds.splice(index, 1);
    } else {
      this.selectedOrganisationIds.push(selectedId)
    }
  }

  selected(organization: Organization) {
    return this.selectedOrganisationIds.includes(organization.org_id)
  }

  search() {
    this.selectedOrganisationIds = []
    this.store.dispatch(getAllOrganizations({
      name: this.searchNameInput.nativeElement.value,
      companyName: this.searchCompanyNameInput.nativeElement.value
    }))
  }

  addOrganisationIds() {
    this.store.dispatch(addOrganisationIds({ ids: this.selectedOrganisationIds }))
    this.close()
  }

}
