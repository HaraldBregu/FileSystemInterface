import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable } from 'rxjs';
import { AssociationData, ProductAssociation } from '../../interfaces/product-association';
import { AssociationDataTableComponent } from '../association-data-table/association-data-table.component';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';
import { ModalSearchComponent } from '../../modals/modal-search/modal-search.component';


@Component({
  selector: 'app-association-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CoreUIModule,
    AssociationDataTableComponent,
    ModalSearchComponent,
  ],
  templateUrl: './association-data.component.html',
  styleUrls: ['./association-data.component.scss']
})
export class AssociationDataComponent {
  @Input() disable: boolean = false
  @Input() productAssociation$: Observable<ProductAssociation> = new Observable()
  @Input() currentProductIsFile$: Observable<boolean> = new Observable()
  @Output() onSelectItemType = new EventEmitter<string>()
  @Output() onSetPrimaryCategory = new EventEmitter<string>()
  @Output() onSearchDataForSelectedProduct = new EventEmitter<string>()
  @Output() onProductAssociationChanged = new EventEmitter<ProductAssociation>()

  formGroup: FormGroup = new FormGroup({})
  selectedcategory: string = "parentcategories"

  constructor() {
    this.productAssociation$.subscribe(productAssociation => {
      this.formGroup.addControl('PRIMARY_CATEGORY', new FormControl(productAssociation.primarycategory ?? ""))
    })
  }

  hasPrimaryCategoryControl() {
    return this.formGroup.get('PRIMARY_CATEGORY') ?? false
  }

  selectPrimaryCategory($event: any) {
    const value = $event.target.value
    this.onSetPrimaryCategory.emit(value)
  }

  addItemsTo(itemType: string, type: string) {
    this.onSelectItemType.emit(itemType)
    this.onSearchDataForSelectedProduct.emit(type)
  }

  updateParentDataList(productAssociation: ProductAssociation | undefined, dataList: AssociationData[]) {
    if (!productAssociation)
      return

    this.onProductAssociationChanged.emit({
      ...productAssociation,
      parentcategories: dataList
    })
  }

  updateChildDataList(productAssociation: ProductAssociation | undefined, dataList: AssociationData[]) {
    if (!productAssociation)
      return

    this.onProductAssociationChanged.emit({
      ...productAssociation,
      childcategories: dataList
    })
  }

  updateProductDataList(productAssociation: ProductAssociation | undefined, dataList: AssociationData[]) {
    if (!productAssociation)
      return

    this.onProductAssociationChanged.emit({
      ...productAssociation,
      products: dataList
    })
  }

}