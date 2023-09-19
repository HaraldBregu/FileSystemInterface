import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store, select } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { addEntity, getDefinitionNames } from 'src/app/modules/dashboard/store/actions/entity.action';
import { definitionNames } from 'src/app/modules/dashboard/store/selectors';

@Component({
  selector: 'app-modal-create-product',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './modal-create-product.component.html',
  styleUrls: ['./modal-create-product.component.scss']
})
export class ModalCreateProductComponent {
  definitionNames$ = this.store.pipe(select(definitionNames))
  selectedType = "C"
  selectedDefinitionName = ''
  displayName = ''

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ModalCreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) {
  }

  checkItem($event: any) {
    this.selectedDefinitionName = ''
    const value = $event.target.value
    this.selectedType = value
  }

  loadDefinitionNames($event: any) {
    this.store.dispatch(getDefinitionNames({t: this.selectedType}))
  }

  selectDefinitionName($event: any) {
    const value = $event.target.value
    this.selectedDefinitionName = value

    console.log(this.selectedDefinitionName)
  }

  setDisplayName($event: any) {
    const value = $event.target.value
    this.displayName = value
  }

  createItem() {
    this.close()
    this.store.dispatch(addEntity({
      definitionname: this.selectedDefinitionName.split('|')[0], 
      classtype: this.selectedDefinitionName.split('|')[1], 
      displayname: this.displayName,
    }))
  }

  close() {
    this.dialogRef.close()
  }

  disabled() {
    return this.selectedDefinitionName === '' || this.displayName === ''
  }
}
