import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { allOrganizations, organizationLoading } from 'src/app/modules/management/store/selectors';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Organization } from '../../interfaces/organization';
import { addOrganisationIds, getAllOrganizations, getAllOrganizationsByPartnerId } from 'src/app/modules/management/store/actions';

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
export class ModalOrganisationsComponent implements OnInit {
  @ViewChild('searchNameInput') searchNameInput: ElementRef = new ElementRef('')
  @ViewChild('searchCompanyNameInput') searchCompanyNameInput: ElementRef = new ElementRef('')

  visible: boolean = false
  allOrganizations$ = this.store.pipe(select(allOrganizations))
  organizationsLoading$ = this.store.pipe(select(organizationLoading))
  selectedOrganisationIds: string[] = []

  constructor(private store: Store) {

  }

  ngOnInit(): void {

  }

  open() {
    this.visible = true
  }

  close() {
    this.visible = false
    this.selectedOrganisationIds = []
  }

  selectOrganisation(organization: Organization) {
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
