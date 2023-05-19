import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductType } from '../../enums/product-type';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { clearNavItems, dashboardDataSelector, getCatalogProperties, getCatalogs, getCategories, getCategoryProperties, selectCatalog, selectCategory } from 'src/app/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  dashboardObservable$ = this.store.select(dashboardDataSelector)
  currentCatalogObservable$: Observable<Product | undefined> = this.dashboardObservable$
    .pipe(map(data => data.currentCatalog))
  currentCatalog: Product | undefined
  navItems$: Observable<Product[]> = this.dashboardObservable$.pipe(map(data => data.navItems))
  lastSelectedProducts$: Observable<Product[]> = this.dashboardObservable$.pipe(map(data => data.products))
  
  constructor(private store: Store) {
    this.currentCatalogObservable$.subscribe(data => this.currentCatalog = data)
  }

  getCatalogs() {
    this.store.dispatch(getCatalogs());
    this.store.dispatch(clearNavItems());
  }

  selectItem(item: Product) {
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

  selectCatalog(item: Product) {
    this.store.dispatch(selectCatalog({ catalog: item }))
    this.store.dispatch(getCatalogProperties({ catalog: item }))
    this.store.dispatch(getCategories({ catalog: item }))
  }

  selectCategory(catalog: Product, category: Product) {
    this.store.dispatch(selectCategory({ category: category }));
    this.store.dispatch(getCategoryProperties({ catalog_name: catalog.name, category_id: category.id }))
    this.store.dispatch(getCategories({ catalog: catalog, category: category }))
  }

}
