import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { hasProductDetail, isCatalogList, productList, productListCount, productListIsEmpty, productLoading, searchDataSelectedResult, selectedProductId, selectedProductList, selectedProductName, selectedProductType, sideMenuOpened } from '../store/selectors';
import { getCatalogs, selectProduct } from '../store/actions/actions';
import { NavigationItem } from 'src/app/shared/interfaces/navigation-item';
import { Product } from 'src/app/shared/interfaces/product';
import { getNavigationItemsFromProduct, selectNavigationItem } from '../store/actions/navigation.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  sideBarMenuOpened$ = this.store.pipe(select(sideMenuOpened))
  navItemsObserver$ = this.store.pipe(select(selectedProductList))
  hasProductDetail$ = this.store.pipe(select(hasProductDetail))

  dataListLoading$ = this.store.pipe(select(productLoading))

  selectedProductName$ = this.store.pipe(select(selectedProductName))
  selectedProductType$ = this.store.pipe(select(selectedProductType))
  selectedProductId$ = this.store.pipe(select(selectedProductId))

  productList$ = this.store.pipe(select(productList))
  productListIsEmpty$ = this.store.pipe(select(productListIsEmpty))
  isCatalogList$ = this.store.pipe(select(isCatalogList))

  navigationList$ = this.store.pipe(select(selectedProductList))
  childsCount$ = this.store.pipe(select(productListCount))
  productStateLoading$ = this.store.pipe(select(productLoading))

  searchDataSelectedResult$ = this.store.pipe(select(searchDataSelectedResult))

  constructor(private store: Store, private router: Router) {
  }

  getCatalogs() {
    this.store.dispatch(getCatalogs())
  }

  selectNavigationItem(item: NavigationItem) {
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
          'dashboard-content': 'explorer'
        }
      }])
  }
}
