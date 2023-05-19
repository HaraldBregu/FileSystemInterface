import { Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  dashboardDataSelector,
  getCatalogProperties,
  getCategories,
  getCategoryAssociations,
  getCategoryProperties,
  getSearchFilters,
  saveCatalogProperties,
  saveCategoryProperties,
  selectCatalog,
  selectCategory
} from 'src/app/store';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductType } from 'src/app/shared/enums/product-type';
import { ProductDetail } from 'src/app/shared/interfaces/product-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productDetail: ProductDetail | undefined
  currentCatalog: Product | undefined
  currentProduct: Product | undefined

  dashboardObservable$ = this.store.select(dashboardDataSelector);
  catalogSubscription$ = this.dashboardObservable$
    .pipe(map(data => data.currentCatalog))
  sideBarMenuOpened$: Observable<boolean> = this.dashboardObservable$
    .pipe(map(data => data.dashboardSideMenuOpened))
  navItemsObserver$: Observable<Product[]> = this.dashboardObservable$
    .pipe(map(data => data.navItems))

  constructor(private store: Store, private router: Router) {
    this.catalogSubscription$.subscribe(catalog => this.currentCatalog = catalog)
  }

  ngOnInit(): void {

  }

  selectItem(item: Product) {
    var catalog = this.currentCatalog
    if (!catalog) return

    switch (item.type) {
      case ProductType.Category:
      case ProductType.CategoryVariant:
      case ProductType.File:
      case ProductType.FileVariant:
      // this.selectCategory(catalog, item);
    }
  }

  saveProductDetail(productDetail: ProductDetail) {
    switch (this.currentProduct?.type) {
      case ProductType.Catalog:
        this.store.dispatch(saveCatalogProperties({ data: productDetail }))
        break
      case ProductType.Category:
      case ProductType.CategoryVariant:
      case ProductType.File:
      case ProductType.FileVariant:
        this.store.dispatch(saveCategoryProperties({ data: productDetail }))
        break
    }
  }

}
