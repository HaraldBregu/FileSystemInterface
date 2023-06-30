import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, combineLatest, distinctUntilChanged, filter, map, skip, take } from 'rxjs';
import Utils from 'src/app/core/utils';
import { ProductType } from 'src/app/shared/enums/product-type';
import { ProductProperty } from 'src/app/shared/interfaces/product-detail';
import { Variant } from 'src/app/shared/interfaces/variant';
import { currentProductDetailAssociationLoading, currentProductDetailBaseProperties, currentProductDetailCustomProperties, currentProductDetailVariant, currentProductIsFile, productAssociation, productAssociationChildCategories, productAssociationPrimaryCategory, productAssociationProducts, productDetail, productDetailTabs, savingProductAssociation, savingProductDetail, selectedProductName, selectedProductType } from '../store/selectors';
import { getSearchDataForSelectedProduct, postProductAssociation, postProductDetail, setProductAssociation, setProductAssociationPrimaryCategory, setProductDetailProperties } from '../store/actions/actions';
import { ProductAssociation } from 'src/app/shared/interfaces/product-association';
import { SearchDataResult } from 'src/app/shared/interfaces/search-data-result';
import { ModalSearchComponent } from 'src/app/shared/modals/modal-search/modal-search.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @ViewChild('modalSearch') modalSearch?: ModalSearchComponent

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
  currentProductIsFile$ = this.store.pipe(select(currentProductIsFile))

  basePropertyValid = new Subject<boolean>()
  customPropertyValid = new Subject<boolean>()
  variantPropertyValid = new Subject<boolean>()

  propertiesValid = combineLatest([
    this.basePropertyValid.asObservable(),
    this.customPropertyValid.asObservable(),
    this.variantPropertyValid.asObservable(),
  ]).pipe(map(([baseValid, customValid]) => baseValid && customValid))

  constructor(private store: Store) {
    this.basePropertyValid.next(true)
    this.customPropertyValid.next(true)
    this.variantPropertyValid.next(true)

    this.productDetailTabs$.subscribe((data) => {
      this.tabs = data
      this.currentTab = data[0]
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
