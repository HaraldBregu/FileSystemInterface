import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { createUpdatePartner } from 'src/app/modules/management/store/actions';
import { Partner } from '../../interfaces/partner';

@Component({
  selector: 'app-modal-partner-create',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './modal-partner-create.component.html',
  styleUrls: ['./modal-partner-create.component.scss']
})
export class ModalPartnerCreateComponent {
  formGroup: FormGroup = new FormGroup({
    "user_name": new FormControl(),
    "password": new FormControl(),
    "certificate": new FormControl(),
    "partner_role_id": new FormControl(),
    "network": new FormControl(),
    "leave_invoice_items": new FormControl(),
    "leave_category_prices": new FormControl(),
    "css": new FormControl(),
    "css_header": new FormControl(),
    "css_footer": new FormControl(),
    "referrer": new FormControl(),
    "referrer_is_mandatory": new FormControl(),
    "html_header": new FormControl(),
    "html_footer": new FormControl(),
    "html_left": new FormControl(),
    "html_right": new FormControl(),
    "split_invoice_items_for_guests": new FormControl(),
  })

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ModalPartnerCreateComponent>) {
  }

  close() {
    this.dialogRef.close()
  }

  createPartner() {
    console.log(this.formGroup.getRawValue())

    const newPartner: Partner = {
      partner_id: "",
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
      partner_role_name: "",
      deletable: false,
    }

    this.store.dispatch(createUpdatePartner({ partner: newPartner }))

    this.close()
  }

}
