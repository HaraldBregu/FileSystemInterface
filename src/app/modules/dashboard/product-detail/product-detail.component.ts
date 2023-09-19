import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, combineLatest, distinctUntilChanged, filter, map, skip, take, takeLast } from 'rxjs';
import Utils from 'src/app/core/utils';
import { ProductType } from 'src/app/shared/enums/product-type';
import { ProductProperty } from 'src/app/shared/interfaces/product-detail';
import { Variant } from 'src/app/shared/interfaces/variant';
import {
  canDeleteEntity,
  currentProductDetailAssociationLoading,
  currentProductDetailBaseProperties,
  currentProductDetailCustomProperties,
  currentProductDetailVariant,
  productAssociation,
  productDetail,
  productDetailTabs,
  savingProductAssociation,
  savingProductDetail,
  selectEmptyProductDetailLoading,
  selectedProductIsFile,
  selectedProductName,
  selectedProductType
} from '../store/selectors';
import {
  getSearchDataForSelectedProduct,
  postProductAssociation,
  postProductDetail,
  setProductAssociation,
  setProductAssociationPrimaryCategory,
  setProductDetailProperties
} from '../store/actions/actions';
import { ProductAssociation } from 'src/app/shared/interfaces/product-association';
import { SearchDataResult } from 'src/app/shared/interfaces/search-data-result';
import { ModalSearchComponent } from 'src/app/shared/modals/modal-search/modal-search.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertButton, AlertButtonType } from 'src/app/shared/interfaces/alert-data';
import { ConfirmDeleteAlertComponent } from 'src/app/shared/alerts/confirm-delete-alert/confirm-delete-alert.component';
import { deleteEntity } from '../store/actions/entity.action';
import { ModalVariantCreateComponent } from 'src/app/shared/modals/modal-variant-create/modal-variant-create.component';
import { deleteVariant, getEmptyVariant } from '../store/actions/variant.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @ViewChild('modalSearch') modalSearch?: ModalSearchComponent

  loadingForm$ = this.store.select(selectEmptyProductDetailLoading);
  tabs: string[] = []
  currentTab: string = ""
  ProductType = ProductType
  currentItemType: string = ""

  updatedProductDetail$ = this.store
    .pipe(select(productDetail))
    .pipe(distinctUntilChanged((prev, curr) => prev === curr))
    .pipe(map(data => data))

  selectedProductType$ = this.store.pipe(select(selectedProductType))
  selectedProductName$ = this.store.pipe(select(selectedProductName))
  currentDetailLoading$ = this.store.pipe(select(currentProductDetailAssociationLoading))
  savingProductDetail$ = this.store.pipe(select(savingProductDetail))
  savingProductAssociation$ = this.store.pipe(select(savingProductAssociation))

  /// TABS
  productDetailTabs$ = this.store
    .pipe(select(productDetailTabs))
    .pipe(distinctUntilChanged((prev, curr) => prev === curr))

  /// BASE PROPERTIES
  baseProperties$ = this.store.pipe(select(currentProductDetailBaseProperties))

  /// CUSTOM PROPERTIES
  customProperties$ = this.store.pipe(select(currentProductDetailCustomProperties))

  /// VARIANTS
  variants$ = this.store.pipe(select(currentProductDetailVariant))

  /// PRODUCT ASSOCIATION
  productAssociation$ = this.store.pipe(select(productAssociation))

  /// PRODUCT IS FILE
  currentProductIsFile$ = this.store.pipe(select(selectedProductIsFile))

  canDeleteEntity$ = this.store.pipe(select(canDeleteEntity))

  basePropertyValid = new Subject<boolean>()
  customPropertyValid = new Subject<boolean>()
  variantPropertyValid = new Subject<boolean>()

  propertiesValid = combineLatest([
    this.basePropertyValid.asObservable(),
    this.customPropertyValid.asObservable(),
    this.variantPropertyValid.asObservable(),
  ]).pipe(map(([baseValid, customValid]) => baseValid && customValid))

  constructor(
    private store: Store,
    private dialog: MatDialog) {

    this.basePropertyValid.next(true)
    this.customPropertyValid.next(true)
    this.variantPropertyValid.next(true)

    this.productDetailTabs$.subscribe((data) => {
      this.tabs = data
      this.currentTab = data[0]
    })

    this.currentDetailLoading$.subscribe(data => {
      // console.log("currentDetailLoading: " + data)
    })
  }

  setBasePropertValidation(valid: boolean) {
    this.basePropertyValid.next(valid)
  }

  setCustomPropertyValidation(valid: boolean) {
    this.customPropertyValid.next(valid)
  }

  setVariantPropertyValidation(valid: boolean) {
    this.variantPropertyValid.next(valid)
  }

  saveAll() {
    this.saveProperties()
    this.saveAssociation()
  }

  deleteCurrentProduct() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '450px'
    dialogConfig.data = {
      title: "Delete",
      description: "Are you sure you want to delete this entity?",
      buttons: [
        { type: AlertButtonType.DESCTRUCTIVE, text: "Delete" },
        { type: AlertButtonType.DISMISS, text: "Cancel" }
      ]
    }
    const dialogRef = this.dialog.open(ConfirmDeleteAlertComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(data => {
      if (data.type === AlertButtonType.DESCTRUCTIVE)
        this.store.dispatch(deleteEntity())
    })
  }

  saveProperties() {
    this.store.dispatch(postProductDetail())
  }

  saveAssociation() {
    this.store.dispatch(postProductAssociation())
  }

  didChangeBasePropertyData(properties: ProductProperty[]) {
    this.store.dispatch(setProductDetailProperties({ productDetailProperties: properties }))
  }

  didChangeCustomPropertyData(properties: ProductProperty[]) {
    this.store.dispatch(setProductDetailProperties({ productDetailProperties: properties }))
  }

  didChangeVariantData(variants: Variant[]) {
    const newProperties = Utils.propertiesFromVariants(variants)
    this.store.dispatch(setProductDetailProperties({ productDetailProperties: newProperties }))
  }

  createNewVariant() {
    this.store.dispatch(getEmptyVariant())

    this.loadingForm$
      .pipe(distinctUntilChanged())
      .pipe(take(2))
      .subscribe(loading => {
        if (loading) return

        const dialogConfig = new MatDialogConfig()
        dialogConfig.position = { top: '30px', bottom: '30px' }
        dialogConfig.width = '350px'
        dialogConfig.autoFocus = false
        dialogConfig.maxHeight = '90vh'
        this.dialog.open(ModalVariantCreateComponent, dialogConfig)
      })
  }

  deleteVariant(variant: Variant) {
    const variantIdProperty = variant.properties.filter(data => data.name === "VariantId")[0]
    const variantId = variantIdProperty.value

    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '450px'

    var actions: AlertButton[] = []
    actions.push({ type: AlertButtonType.DESCTRUCTIVE, text: "Delete" })
    actions.push({ type: AlertButtonType.DISMISS, text: "Cancel" })

    dialogConfig.data = {
      title: "Delete",
      description: `Are you sure you want to delete variant with id ${variantId}?`,
      buttons: actions
    }

    const dialogRef = this.dialog.open(ConfirmDeleteAlertComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(data => {
      if (data.type === AlertButtonType.DESCTRUCTIVE) {
        this.store.dispatch(deleteVariant({ variantId: variantId }))
      }
    })

  }

  /// ASSOCIATIONS

  setPrimaryCategory($event: string) {
    this.store.dispatch(setProductAssociationPrimaryCategory({ primaryCategory: $event }))
  }

  /// MODAL SEARCH

  searchDataForSelectedProduct($event: string) {
    this.modalSearch?.open()
    this.store.dispatch(getSearchDataForSelectedProduct({ searchType: $event }))
  }

  onSelectItemType(type: string) {
    this.currentItemType = type
  }

  addSelectedItems(productAssociation: ProductAssociation, selectedData: SearchDataResult[]) {

    if (this.currentItemType === 'parent') {
      this.addAsParentSearchData(productAssociation, selectedData)
    }
    else if (this.currentItemType === 'child') {
      this.addAsChildSearchData(productAssociation, selectedData)
    }
    else if (this.currentItemType === 'products') {
      this.addToProductsSearchData(productAssociation, selectedData)
    }
  }

  addAsParentSearchData(productAssociation: ProductAssociation, selectedData: SearchDataResult[]) {
    const tmpCategories = [
      ...(productAssociation.parentcategories ?? []),
      ...selectedData.map((searchDataResult: SearchDataResult) => {
        return {
          oid: searchDataResult.oid,
          childoid: productAssociation.id,
          code: searchDataResult.displayname,
          displayname: searchDataResult.displayname,
          status: "N"
        }
      })
    ].filter((v, i, a) => a.findIndex(v2 => (v.oid === v2.oid && v.childoid === v2.childoid)) === i)

    this.store.dispatch(setProductAssociation({
      productAssociation: {
        ...productAssociation,
        parentcategories: tmpCategories
      }
    }))
  }

  addAsChildSearchData(productAssociation: ProductAssociation, selectedData: SearchDataResult[]) {
    const tmpCategories = [
      ...productAssociation.childcategories,
      ...selectedData.map((searchDataResult: SearchDataResult) => {
        return {
          oid: productAssociation.id,
          childoid: searchDataResult.oid,
          code: searchDataResult.displayname,
          displayname: searchDataResult.displayname,
          status: "N"
        }
      })
    ].filter((v, i, a) => a.findIndex(v2 => (v.oid === v2.oid && v.childoid === v2.childoid)) === i)

    this.store.dispatch(setProductAssociation({
      productAssociation: {
        ...productAssociation,
        childcategories: tmpCategories
      }
    }))

  }

  addToProductsSearchData(productAssociation: ProductAssociation, selectedData: SearchDataResult[]) {
    const tmpProducts = [
      ...productAssociation.products,
      ...selectedData.map((searchDataResult: SearchDataResult) => {
        return {
          oid: productAssociation.id,
          childoid: searchDataResult.oid,
          code: searchDataResult.displayname,
          displayname: searchDataResult.displayname,
          status: "N"
        }
      })
    ].filter((v, i, a) => a.findIndex(v2 => (v.oid === v2.oid && v.childoid === v2.childoid)) === i)

    this.store.dispatch(setProductAssociation({
      productAssociation: {
        ...productAssociation,
        products: tmpProducts
      }
    }))
  }

  productAssociationChanged(data: ProductAssociation) {
    this.store.dispatch(setProductAssociation({ productAssociation: data }))
  }

}
