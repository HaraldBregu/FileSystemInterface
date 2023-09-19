import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ProductOrder } from 'src/app/shared/enums/product-order';
import { ProductType } from 'src/app/shared/enums/product-type';
import { Product } from 'src/app/shared/interfaces/product';
import { productLoading } from '../store/selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  dataListLoading$ = this.store.pipe(select(productLoading))

  @Input() selectedProductType$: Observable<ProductType | undefined> = new Observable()
  @Input() selectedProductName$: Observable<string | undefined> = new Observable()
  @Input() selectedProductId$: Observable<number | undefined> = new Observable()
  @Input() productList$: Observable<Product[]> = new Observable()
  @Input() productListIsEmpty$: Observable<boolean> = new Observable()
  @Input() isCatalogList$: Observable<boolean> = new Observable()
  @Output() onSelectItem = new EventEmitter<Product>();
  @ViewChild('searchInput') searchInput: ElementRef = new ElementRef('')

  ProductType = ProductType
  productOrder: ProductOrder = ProductOrder.NONE
  ProductOrder = ProductOrder
  filteredProductList$ = this.productList$

  constructor(private store:Store) {
    
  }

  ngOnInit(): void {
    this.filteredProductList$ = this.productList$
  }

  selectProduct(product: Product) {
    this.clearFilteredData()
    this.onSelectItem.emit(product)
  }

  toggleOrderByProductName() {
    switch (this.productOrder) {
      case ProductOrder.NONE:
        this.productOrder = ProductOrder.AZ
        this.filteredProductList$ = this.productList$
          .pipe(map(data => data.slice().sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))))
        break
      case ProductOrder.AZ:
        this.productOrder = ProductOrder.ZA
        this.filteredProductList$ = this.productList$
          .pipe(map(data => data.slice().sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))))
        break
      case ProductOrder.ZA:
        this.productOrder = ProductOrder.NONE
        this.filteredProductList$ = this.productList$
    }
  }

  filterData($event: any) {
    this.productOrder = ProductOrder.NONE
    const inputValue = $event.target.value

    this.filteredProductList$ = this.productList$
      .pipe(map(data => data
        .filter(content => content.name.toLowerCase()
          .includes(inputValue.toLowerCase()))
      ))
  }

  clearFilteredData() {
    this.searchInput.nativeElement.value = ''
    this.filteredProductList$ = this.productList$
  }

}
