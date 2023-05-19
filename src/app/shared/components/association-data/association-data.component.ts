import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { DashboardModelState, dashboardDataSelector, getSearchFilters } from 'src/app/store';
import { Observable, distinctUntilChanged, filter, from, map } from 'rxjs';
import { AssociationData, ProductAssociation } from '../../interfaces/product-association';
import { AssociationDataTableComponent } from '../association-data-table/association-data-table.component';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';
import { ModalSearchComponent } from '../../modals/modal-search/modal-search.component';
import { Product } from '../../interfaces/product';

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
export class AssociationDataComponent implements OnInit {
  @Output() onDataChanges = new EventEmitter<ProductAssociation>()
  @ViewChild('modalSearch') modalSearch?: ModalSearchComponent

  formGroup: FormGroup = new FormGroup({})
  dashboardObservable$: Observable<DashboardModelState> =
    this.store.select(dashboardDataSelector)
  productAssociationObservable$: Observable<ProductAssociation | undefined> =
    this.dashboardObservable$
      .pipe(filter(data => data.currentProductAssociation !== undefined || data.currentProductAssociation !== null))
      .pipe(map(data => data.currentProductAssociation))
  navItemsObservable$: Observable<Product[]> =
    this.dashboardObservable$
      .pipe(filter(data => data.navItems.length > 1))
      .pipe(map(data => data.navItems))


  currentCatalogName?: string
  currentProductId?: number

  productAssociation?: ProductAssociation
  parentCategories?: AssociationData[]
  childCategories?: AssociationData[]
  products?: AssociationData[]
  selectedcategory: string = ""
  hasParentAndChild: boolean = false

  constructor(private store: Store) {

    this.productAssociationObservable$.subscribe(data => {
      if (!data) return

      this.productAssociation = data

      this.formGroup.addControl(data.catalogname, new FormControl(data.primarycategory))

      this.parentCategories = data.parentcategories
      this.childCategories = data.childcategories
      this.products = data.products

      const hasParent = this.parentCategories.length > 0
      const hasChild = this.childCategories.length > 0

      this.hasParentAndChild = hasParent && hasChild
      this.selectedcategory = ""
      if (hasParent) {
        this.selectedcategory = "parentcategories"
      } else if (hasChild) {
        this.selectedcategory = "childcategories"
      }

    })

    this.navItemsObservable$.subscribe(data => {
      this.currentCatalogName = data[0].name
      this.currentProductId = data.at(data.length - 1)?.id
    })

  }

  ngOnInit(): void {

  }

  updateParentDataList(dataList: AssociationData[]) {
    if (!this.productAssociation)
      return

    this.productAssociation = {
      ...this.productAssociation,
      parentcategories: dataList
    }

    this.onDataChanges.emit(this.productAssociation)
  }

  updateChildDataList(dataList: AssociationData[]) {
    if (!this.productAssociation)
      return

    this.productAssociation = {
      ...this.productAssociation,
      childcategories: dataList
    }

    this.onDataChanges.emit(this.productAssociation)
  }

  updateProductDataList(dataList: AssociationData[]) {
    if (!this.productAssociation)
      return

    this.productAssociation = {
      ...this.productAssociation,
      products: dataList
    }

    this.onDataChanges.emit(this.productAssociation)
  }

  addNewData() {
    this.store.dispatch(getSearchFilters({
      catalog_name: this.currentCatalogName,
      category_id: this.currentProductId
    }))
    
    this.modalSearch?.open()
  }

}
