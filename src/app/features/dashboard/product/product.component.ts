import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { dashboardDataSelector } from '../store/selectors';
import { getCatalogProperties, getCategories, getProductDetail, selectCatalog, selectCategory, selectProduct } from '../store';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductType } from 'src/app/shared/enums/product-type';
import { ProductDetail, ProductProperty } from 'src/app/shared/interfaces/product-detail';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  catalogSubscription$: Observable<Product | undefined> = new Observable()
  selectedProductSubscription$: Observable<Product | undefined> = new Observable()
  items$: Observable<Product[]> = new Observable()
  items: Product[] = []
  navitems: Product[] = []
  productDetail: ProductDetail | undefined
  currentCatalog: Product | undefined
  currentProduct: Product | undefined
  ProductType = ProductType
  isTableList: boolean = true
  isFile: boolean = false
  collapseForm: boolean = true

  productDetailObserver$: Observable<ProductDetail | undefined> = new Observable()

  constructor(private store: Store) {
    const dashboardObservable$ = this.store.select(dashboardDataSelector);

    dashboardObservable$
      .pipe(map(data => data.navItems))
      .subscribe(product => this.navitems = product)

    this.items$ = dashboardObservable$.pipe(map(data => data.products))
    this.items$.subscribe(product => this.items = product)

    this.catalogSubscription$ = dashboardObservable$.pipe(map(data => data.currentCatalog))
    this.catalogSubscription$.subscribe(catalog => this.currentCatalog = catalog)

    this.selectedProductSubscription$ = dashboardObservable$.pipe(map(data => data.navItems.at(-1)))
    this.selectedProductSubscription$.subscribe(product => {
      this.isFile = product?.type == ProductType.File || product?.type == ProductType.FileVariant
      this.currentProduct = product
    })

    this.productDetailObserver$ = dashboardObservable$.pipe(map(data => data.currentProductDetail))
    this.productDetailObserver$.subscribe(data => this.productDetail = data)
  }

  /// TO FIX
  selectBreadcrumbItem(item: Product) {
    this.collapseForm = true

    switch (item.type) {
      case ProductType.Catalog:
        this.store.dispatch(selectCatalog({ catalog: item }))
        this.store.dispatch(getCategories({ catalog: item }))
        break
      case ProductType.Category:
        if (this.currentCatalog == null)
          return
        this.store.dispatch(selectCategory({ category: item }));
        this.store.dispatch(getCategories({
          catalog: this.currentCatalog,
          category: item,
        }))
        break
      case ProductType.File:
        this.store.dispatch(selectProduct({ product: item }));
    }
  }

  selectItem(item: Product) {
    this.collapseForm = true
    if (this.currentCatalog == null)
      return

    switch (item.type) {
      case ProductType.Category:
      case ProductType.CategoryVariant:
        this.store.dispatch(selectCategory({ category: item }));
        this.store.dispatch(getCategories({
          catalog: this.currentCatalog,
          category: item,
        }))
        break
      case ProductType.File:
      case ProductType.FileVariant:
        this.store.dispatch(selectProduct({ product: item }));
    }
  }

  onToggle(event: ProductDetail) {
    if (this.currentCatalog == null || this.currentProduct == null)
      return

    if (this.currentProduct.type == ProductType.Catalog) {
      this.store.dispatch(getCatalogProperties({ catalog: this.currentCatalog }))
    } else {
      this.store.dispatch(getProductDetail({
        catalog: this.currentCatalog,
        category: this.currentProduct
      }))
    }
  }

}
