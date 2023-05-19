import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductDetail, ProductProperty } from '../../interfaces/product-detail';
import { Product } from '../../interfaces/product';
import { Store } from '@ngrx/store';
import { Observable, Subscription, distinctUntilChanged, filter, from, map, pipe, take } from 'rxjs';
import { dashboardDataSelector, getCatalogProperties, getCategoryAssociations, getCategoryProperties } from 'src/app/store';
import { CommonModule } from '@angular/common';
import { PropFormComponent } from '../prop-form/prop-form.component';
import { VariantsTableComponent } from '../variants-table/variants-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssociationDataComponent } from '../association-data/association-data.component';
import { ProductAssociation } from '../../interfaces/product-association';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';

@Component({
  selector: 'app-detail-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PropFormComponent,
    VariantsTableComponent,
    AssociationDataComponent,
    CoreUIModule,
  ],
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent implements OnInit, OnDestroy {
  @Input() unfolded: boolean = false
  @Input() framed: boolean = false

  dashboardObservable$ = this.store.select(dashboardDataSelector)
  currentProductChangeSubscribtion$: Subscription = new Subscription()
  currentProductDetailChangeSubscribtion$: Subscription = new Subscription()
  currentProductDetailObserver$: Observable<ProductDetail | undefined> = this.dashboardObservable$
    .pipe(distinctUntilChanged((prev, curr) => prev.currentProductDetail === curr.currentProductDetail))
    .pipe(map(data => data.currentProductDetail))
  currentProductAssociationsSubscribtion$: Subscription = new Subscription()
  productAssociationObserver$ = this.dashboardObservable$
    .pipe(filter(data => data.currentProductAssociation !== undefined))
    .pipe(map(data => data.currentProductAssociation))
  selectedProductObserver$: Observable<Product | undefined> = this.dashboardObservable$
    .pipe(map(data => data.navItems.at(-1)))
  getPropertiesLoadingObserver$: Observable<boolean> = this.dashboardObservable$
    .pipe(map(data => data.getCurrentProductDetailLoading))
  savePropertiesLoadingObserver$: Observable<boolean> = this.dashboardObservable$
    .pipe(map(data => data.saveCurrentProductDetailLoading))

  productDetail: ProductDetail | undefined
  associationData?: ProductAssociation

  fold = true
  tabs: string[] = []
  currentTab: string = ""

  constructor(private store: Store) {

    this.currentProductDetailChangeSubscribtion$ = this.currentProductDetailObserver$
      .subscribe(data => {

        this.tabs = []

        this.productDetail = data

        const baseProperties = data?.properties.filter(data => data.type === "Base") ?? [];
        this.addTab("BaseProperties", (baseProperties.length > 0))

        const customProperties = data?.properties.filter(data => data.type === "Custom") ?? []
        this.addTab("CustomProperties", (customProperties.length > 0))

        const variantProperties = data?.properties.filter(data => data.type === "Variant") ?? [];
        this.addTab("Variants", (variantProperties.length > 0))
      })

    this.currentProductAssociationsSubscribtion$ = this.productAssociationObserver$
      .subscribe(data => {
        this.removeTab("Associations")
        if (data) {
          this.addTab("Associations")
        }
      })

    this.currentProductChangeSubscribtion$ = this.dashboardObservable$
      .pipe(distinctUntilChanged((prev, curr) => prev.currentProduct === curr.currentProduct))
      .pipe(map(data => data))
      .subscribe(data => {

        if (data.currentCatalog && data.currentProduct) {

          this.store.dispatch(getCategoryProperties({
            catalog_name: data.currentCatalog.name,
            category_id: data.currentProduct.id
          }))

          this.store.dispatch(getCategoryAssociations({
            catalog_name: data.currentCatalog.name,
            category_id: data.currentProduct.id
          }))

        } else if (data.currentCatalog) {

          this.store.dispatch(getCatalogProperties({
            catalog: data.currentCatalog
          }))

        }

      })

    from([this.tabs])
      .pipe(filter(data => data.length > 0))
      .pipe(distinctUntilChanged())
      .subscribe(data => {
        this.selectTab(this.tabs[0])
      })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.currentProductChangeSubscribtion$.unsubscribe()
    this.currentProductDetailChangeSubscribtion$.unsubscribe()
    this.currentProductAssociationsSubscribtion$.unsubscribe()
  }

  saveBaseProperties(properties: ProductProperty[]) {
    if (!this.productDetail)
      return

    var customProperties = this.productDetail.properties.filter(data => data.type === "Custom") ?? []
    var variantProperties = this.productDetail.properties.filter(data => data.type === "Variant") ?? []

    var newProperties = [
      ...properties,
      ...customProperties,
      ...variantProperties,
    ]

    var newProductDetail = {
      ...this.productDetail,
      properties: newProperties,
    }

    //this.onSaveProductDetail.emit(newProductDetail)
  }

  saveCustomProperties(properties: ProductProperty[]) {
    if (!this.productDetail)
      return

    var baseProperties = this.productDetail.properties.filter(data => data.type === "Base") ?? []
    var variantProperties = this.productDetail.properties.filter(data => data.type === "Variant") ?? []

    var newProperties = [
      ...baseProperties,
      ...properties,
      ...variantProperties,
    ]

    var newProductDetail = {
      ...this.productDetail,
      properties: newProperties,
    }

    //this.onSaveProductDetail.emit(newProductDetail)
  }

  saveVariantProperties(properties: ProductProperty[]) {
    if (!this.productDetail)
      return

    var baseProperties = this.productDetail?.properties.filter(data => data.type === "Base") ?? []
    var customProperties = this.productDetail?.properties.filter(data => data.type === "Custom") ?? []

    var newProperties = [
      ...baseProperties,
      ...customProperties,
      ...properties
    ]

    var newProductDetail = {
      ...this.productDetail,
      properties: newProperties,
    }

    //this.onSaveProductDetail.emit(newProductDetail)
  }

  saveAssociationData() {

  }

  dataAssociationChanges(data: ProductAssociation) {
    this.associationData = data
  }

  addTab(tabName: string, condition: boolean = true, remove: boolean = false) {
    if (!condition)
      return

    const index = this.tabs.indexOf(tabName)
    if (index === -1) {
      this.tabs.push(tabName);
    }
  }

  removeTab(tabName: string) {
    const index = this.tabs.indexOf(tabName)
    if (index !== -1) {
      this.tabs.splice(index, 1)
    }
  }

  selectTab(name: string) {
    this.currentTab = name
  }

  toggleAccordion() {
    if (this.unfolded) return

    this.fold = !this.fold
    if (this.fold) {
      this.currentTab = ""
      this.productDetail = undefined
    }

    if (this.tabs.length > 0) {
      this.selectTab(this.tabs[0])
    }
  }

}
