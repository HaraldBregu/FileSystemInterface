import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { dashboardDataSelector } from '../store/selectors';
import {
  getCatalogProperties,
  getCategories,
  getCategoryProperties,
  saveCatalogProperties,
  saveCategoryProperties,
  selectCatalog,
  selectCategory
} from '../store';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductType } from 'src/app/shared/enums/product-type';
import { ProductDetail } from 'src/app/shared/interfaces/product-detail';
import { CatalogService } from 'src/app/shared/services/catalog.service';

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
  propertiesLoader: boolean = false
  productDetailObserver$: Observable<ProductDetail | undefined> = new Observable()

  constructor(private store: Store, private catalogService: CatalogService) {
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
    this.productDetailObserver$.subscribe(data => {
      this.productDetail = data
    })

    // Properties loader
    dashboardObservable$.pipe(map(data => data.propertiesLoading)).subscribe(data => this.propertiesLoader = data)
  }

  selectBreadcrumbItem(item: Product) {
    var catalog = this.currentCatalog
    if (!catalog) return

    switch (item.type) {
      case ProductType.Catalog:
        this.selectCatalog(item)
        break
      case ProductType.Category:
      case ProductType.CategoryVariant:
      case ProductType.File:
      case ProductType.FileVariant:
        this.selectCategory(catalog, item);
        break
    }
  }

  selectItem(item: Product) {
    var catalog = this.currentCatalog
    if (!catalog) return

    switch (item.type) {
      case ProductType.Category:
      case ProductType.CategoryVariant:
      case ProductType.File:
      case ProductType.FileVariant:
        this.selectCategory(catalog, item);
    }
  }

  showFormData(event: ProductDetail) {
    var catalog = this.currentCatalog
    if (!catalog) return

    switch (this.currentProduct?.type) {
      case ProductType.Catalog:
        this.store.dispatch(getCatalogProperties({ catalog: catalog }))
        break
      case ProductType.Category:
      case ProductType.CategoryVariant:
      case ProductType.File:
      case ProductType.FileVariant:
        //if (this.currentProduct == null)
        //return
        this.store.dispatch(getCategoryProperties({ catalog_name: catalog.name, category_id: this.currentProduct.id, }))
        break
    }

  }

  saveProductDetail(event: ProductDetail) {
    switch (this.currentProduct?.type) {
      case ProductType.Catalog:
        this.store.dispatch(saveCatalogProperties({ data: event }))
        break
      case ProductType.Category:
      case ProductType.CategoryVariant:
      case ProductType.File:
      case ProductType.FileVariant:
        this.store.dispatch(saveCategoryProperties({ data: event }))
        break
    }
  }


  selectCatalog(item: Product) {
    this.store.dispatch(selectCatalog({ catalog: item }))
    this.store.dispatch(getCategories({ catalog: item }))
    this.store.dispatch(getCatalogProperties({ catalog: item }))
  }

  selectCategory(catalog: Product, category: Product) {
    this.store.dispatch(selectCategory({ category: category }));
    this.store.dispatch(getCategories({ catalog: catalog, category: category, }))
    this.store.dispatch(getCategoryProperties({ catalog_name: catalog.name, category_id: category.id, }))
  }

}
