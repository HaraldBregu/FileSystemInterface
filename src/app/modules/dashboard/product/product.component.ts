import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  createItemSelector,
  currentProductAssociationLoading,
  currentProductDetailAssociationLoading,
  currentProductDetailLoading,
  hasProductDetail,
  isCatalogList,
  productList,
  productListCount,
  productListIsEmpty,
  productLoading,
  searchDataSelectedResult,
  selectedProductId,
  selectedProductList,
  selectedProductName,
  selectedProductType,
} from '../store/selectors';
import { getCatalogs, selectProduct } from '../store/actions/actions';
import { NavigationItem } from 'src/app/shared/interfaces/navigation-item';
import { Product } from 'src/app/shared/interfaces/product';
import { getNavigationItemsFromProduct, selectNavigationItem } from '../store/actions/navigation.actions';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalCreateProductComponent } from 'src/app/shared/modals/modal-create-product/modal-create-product.component';
import { ProductType } from 'src/app/shared/enums/product-type';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  navItemsObserver$ = this.store.pipe(select(selectedProductList))
  hasProductDetail$ = this.store.pipe(select(hasProductDetail))

  currentDetailLoading$ = this.store.pipe(select(currentProductDetailAssociationLoading))

  dataListLoading$ = this.store.pipe(select(productLoading))
  currentProductDetailLoading$ = this.store.pipe(select(currentProductDetailLoading))
  currentProductAssociationLoading$ = this.store.pipe(select(currentProductAssociationLoading))

  selectedProductName$ = this.store.pipe(select(selectedProductName))
  selectedProductType$ = this.store.pipe(select(selectedProductType))
  selectedProductId$ = this.store.pipe(select(selectedProductId))
  createItemSelector$ = this.store.pipe(select(createItemSelector))

  productList$ = this.store.pipe(select(productList))
  productListIsEmpty$ = this.store.pipe(select(productListIsEmpty))
  isCatalogList$ = this.store.pipe(select(isCatalogList))

  navigationList$ = this.store.pipe(select(selectedProductList))
  childsCount$ = this.store.pipe(select(productListCount))
  productStateLoading$ = this.store.pipe(select(productLoading))

  searchDataSelectedResult$ = this.store.pipe(select(searchDataSelectedResult))

  ProductType = ProductType

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog) {
  }

  getCatalogs() {
    this.store.dispatch(getCatalogs())
  }

  selectNavigationItem(item: NavigationItem) {
    var loading = false
    this.currentDetailLoading$.subscribe(data => loading = data);
    if (loading) return
    this.store.dispatch(selectNavigationItem({ item: item }))
  }

  selectProduct(product: Product) {
    this.store.dispatch(selectProduct({ product: product }))
    this.store.dispatch(getNavigationItemsFromProduct({ product: product }))
  }

  backToSearchResult() {
    this.router.navigate([
      '/dashboard', {
        outlets: {
          'content': 'explorer'
        }
      }])
  }

  createItem(item: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = false
    dialogConfig.position = { top: '30px', bottom: '30px' }
    dialogConfig.width = '450px'

    //const isCategory = item.type === ProductType.Category || item.type === ProductType.CategoryVariant
    //const typeProduct = isCategory ? "category" : "product" 
    dialogConfig.data = {
      title: "Create a new category or product",
      item: item
    }

    this.dialog.open(ModalCreateProductComponent, dialogConfig)
  }

}
