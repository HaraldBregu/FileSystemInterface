import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ProductType } from '../../enums/product-type';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { dashboardDataSelector, getCatalogProperties, getCategories, getCategoryProperties, selectCatalog, selectCategory } from 'src/app/store';
import { Observable, map } from 'rxjs';
import { ProductOrder } from '../../enums/product-order';

@Component({
  selector: 'app-data-list',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent {
  @ViewChild('searchInput') searchInput: ElementRef = new ElementRef('')

  dashboardObservable$ = this.store.select(dashboardDataSelector)

  products$: Observable<Product[]> = this.dashboardObservable$
    .pipe(map(data => {
      return (data.products.length > 0) ? data.products : data.catalogs
    }))
  filteredProducts$: Observable<Product[]> = this.dashboardObservable$
    .pipe(map(data => {
      return (data.products.length > 0) ? data.products : data.catalogs
    }))

  currentCatalogObservable$: Observable<Product | undefined> = this.dashboardObservable$
    .pipe(map(data => data.currentCatalog))

  ProductType = ProductType
  productOrder: ProductOrder = ProductOrder.NONE
  ProductOrder = ProductOrder

  constructor(private store: Store) { }

  selectCatalog(catalog: Product) {
    this.clearFilteredData()
    this.store.dispatch(selectCatalog({ catalog: catalog }))
    this.store.dispatch(getCatalogProperties({ catalog: catalog }))
    this.store.dispatch(getCategories({ catalog: catalog }))
  }

  selectCategory(category: Product, catalog: Product) {
    this.clearFilteredData()
    this.store.dispatch(selectCategory({ category: category }));
    this.store.dispatch(getCategoryProperties({ catalog_name: catalog.name, category_id: category.id }))
    this.store.dispatch(getCategories({ catalog: catalog, category: category }))
  }

  toggleOrderByProductName() {
    switch (this.productOrder) {
      case ProductOrder.NONE:
        this.productOrder = ProductOrder.AZ
        this.filteredProducts$ = this.products$
          .pipe(map(data => data.slice().sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))))
        break
      case ProductOrder.AZ:
        this.productOrder = ProductOrder.ZA
        this.filteredProducts$ = this.products$
          .pipe(map(data => data.slice().sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))))
        break
      case ProductOrder.ZA:
        this.productOrder = ProductOrder.NONE
        this.filteredProducts$ = this.products$
    }
  }

  filterData($event: any) {
    this.productOrder = ProductOrder.NONE
    const inputValue = $event.target.value

    this.filteredProducts$ = this.products$
      .pipe(map(data => data
        .filter(content => content.name.toLowerCase()
          .includes(inputValue.toLowerCase()))
        .slice(0, 15)
      ))
  }

  clearFilteredData() {
    this.searchInput.nativeElement.value = ''
    this.filteredProducts$ = this.products$
  }

}
