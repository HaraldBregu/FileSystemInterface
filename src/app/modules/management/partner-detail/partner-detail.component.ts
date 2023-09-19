import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { createUpdatePartner, deleteOrganisationIds, deletePartnerId, getAllOrganizations, getAllOrganizationsByPartnerId, getPartnerRoles, getPartners, getSearchRoles } from '../store/actions';
import { associatedOrganizations, organizationLoading, partnersLoading, selectDetailTabs, selectPartners, selectRoles, selectedPartner } from '../store/selectors';
import { Partner } from 'src/app/shared/interfaces/partner';
import { getPartnerId } from '../store/actions';
import { PartnerRole } from 'src/app/shared/interfaces/partner-role';
import { FormControl, FormGroup } from '@angular/forms';
import { Organization } from 'src/app/shared/interfaces/organization';
import { AlertButton, AlertButtonType } from 'src/app/shared/interfaces/alert-data';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDeleteAlertComponent } from 'src/app/shared/alerts/confirm-delete-alert/confirm-delete-alert.component';
import { ModalOrganisationsComponent } from 'src/app/shared/modals/modal-organisations/modal-organisations.component';
import { ModalPartnerCreateComponent } from 'src/app/shared/modals/modal-partner-create/modal-partner-create.component';

@Component({
  selector: 'app-partner-detail',
  templateUrl: './partner-detail.component.html',
  styleUrls: ['./partner-detail.component.scss']
})
export class PartnerDetailComponent implements OnInit, OnChanges, OnDestroy {
  partners$ = this.store.pipe(select(selectPartners))
  partnersLoading$ = this.store.pipe(select(partnersLoading))
  selectedPartner$ = this.store.pipe(select(selectedPartner))
  roles$ = this.store.pipe(select(selectRoles))
  tabs$ = this.store.pipe(select(selectDetailTabs))
  associatedOrganizations$ = this.store.pipe(select(associatedOrganizations))
  organizationsLoading$ = this.store.pipe(select(organizationLoading))

  alertSubscription = new Subscription()

  selectedOrganisationId = ''
  currentTab: string = 'Agencies'
  formGroup: FormGroup = new FormGroup({})

  constructor(
    private store: Store,
    private dialog: MatDialog,
  ) {

    this.selectedPartner$.subscribe(data => {
      this.formGroup = new FormGroup({})
      this.formGroup.addControl("user_name", new FormControl(data?.user_name))
      this.formGroup.addControl("password", new FormControl(data?.password))
      this.formGroup.addControl("partner_role_id", new FormControl(data?.partner_role_id))
      this.formGroup.addControl("certificate", new FormControl(data?.certificate))
      this.formGroup.addControl("network", new FormControl(data?.network))
      this.formGroup.addControl("leave_invoice_items", new FormControl(data?.leave_invoice_items))
      this.formGroup.addControl("leave_category_prices", new FormControl(data?.leave_category_prices))
      this.formGroup.addControl("referrer_is_mandatory", new FormControl(data?.referrer_is_mandatory))
      this.formGroup.addControl("referrer", new FormControl(data?.referrer))
      this.formGroup.addControl("split_invoice_items_for_guests", new FormControl(data?.split_invoice_items_for_guests))
      this.formGroup.addControl("html_header", new FormControl(data?.html_header))
      this.formGroup.addControl("css_header", new FormControl(data?.css_header))
      this.formGroup.addControl("html_footer", new FormControl(data?.html_footer))
      this.formGroup.addControl("css_footer", new FormControl(data?.css_footer))
      this.formGroup.addControl("html_left", new FormControl(data?.html_left))
      this.formGroup.addControl("html_right", new FormControl(data?.html_right))
      this.formGroup.addControl("css", new FormControl(data?.css))
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  getPartnerList() {
    this.store.dispatch(getPartners({}))
  }

  selectPartner(partner: Partner) {
    this.store.dispatch(getPartnerId({ partnerId: partner.partner_id }))
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe()
  }

  savePartner(partner: Partner) {

    const newPartner: Partner = {
      ...partner,
      user_name: this.formGroup?.get("user_name")?.value,
      password: this.formGroup?.get("password")?.value,
      partner_role_id: this.formGroup?.get("partner_role_id")?.value,
      certificate: this.formGroup?.get("certificate")?.value,
      network: this.formGroup?.get("network")?.value,
      leave_invoice_items: this.formGroup?.get("leave_invoice_items")?.value,
      leave_category_prices: this.formGroup?.get("leave_category_prices")?.value,
      referrer_is_mandatory: this.formGroup?.get("referrer_is_mandatory")?.value,
      referrer: this.formGroup?.get("referrer")?.value,
      split_invoice_items_for_guests: this.formGroup?.get("split_invoice_items_for_guests")?.value,
      html_header: this.formGroup?.get("html_header")?.value,
      css_header: this.formGroup?.get("css_header")?.value,
      html_footer: this.formGroup?.get("html_footer")?.value,
      css_footer: this.formGroup?.get("css_footer")?.value,
      html_left: this.formGroup?.get("html_left")?.value,
      html_right: this.formGroup?.get("html_right")?.value,
      css: this.formGroup?.get("css")?.value,
    }

    this.store.dispatch(createUpdatePartner({ partner: newPartner }))

  }

  addNewPartner() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '550px'
    dialogConfig.autoFocus = false
    dialogConfig.maxHeight = '90vh'
    this.dialog.open(ModalPartnerCreateComponent, dialogConfig)
    this.store.dispatch(getAllOrganizationsByPartnerId())
  }

  deletePartner(partner: Partner) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '450px'

    var actions: AlertButton[] = []
    actions.push({ type: AlertButtonType.DESCTRUCTIVE, text: "Delete" })
    actions.push({ type: AlertButtonType.DISMISS, text: "Cancel" })

    dialogConfig.data = {
      title: "Delete",
      description: "Are you sure you want to delete partner '" + partner.user_name + "'?",
      buttons: actions
    }

    const dialogRef = this.dialog.open(ConfirmDeleteAlertComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(data => {
      if (data.type === AlertButtonType.DESCTRUCTIVE)
        this.store.dispatch(deletePartnerId({ partnerId: partner.partner_id }))
    })
  }

  loadSearchRoles($event: any) {
    this.store.dispatch(getSearchRoles())
  }

  loadPartnerRoles($event: any) {
    this.store.dispatch(getPartnerRoles())
  }

  selectRole(role: PartnerRole) {
    this.store.dispatch(getPartners({
      partnerName: undefined,
      partnerRoleId: role?.partner_role_id
    }))
  }

  searchNewAgencies() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '950px'
    dialogConfig.autoFocus = false
    dialogConfig.maxHeight = '90vh'
    //dialogConfig.data = role
    this.dialog.open(ModalOrganisationsComponent, dialogConfig)
    this.store.dispatch(getAllOrganizationsByPartnerId())
  }

  deleteOrganisation(organisation: Organization) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '450px'

    var actions: AlertButton[] = []
    actions.push({ type: AlertButtonType.DESCTRUCTIVE, text: "Dissociate" })
    actions.push({ type: AlertButtonType.DISMISS, text: "Cancel" })

    dialogConfig.data = {
      title: "Dissociate",
      description: "Are you sure you want to dissociate this Agency from the current partner?",
      buttons: actions
    }

    const dialogRef = this.dialog.open(ConfirmDeleteAlertComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(data => {
      if (data.type === AlertButtonType.DESCTRUCTIVE) {
        this.store.dispatch(deleteOrganisationIds({ ids: [organisation.org_id] }))
        this.selectedOrganisationId = ''
      }
    })
  }

}
