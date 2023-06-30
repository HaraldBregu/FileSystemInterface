import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProductType } from '../../enums/product-type';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, map } from 'rxjs';
import { ProductOrder } from '../../enums/product-order';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';

@Component({
  selector: 'app-data-list',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    CoreUIModule,
  ],
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  @Input() loading: boolean = false
  @Input() selectedProductType$: Observable<ProductType | undefined> = new Observable()
  @Input() selectedProductName$: Observable<string | undefined> = new Observable()
  @Input() selectedProductId$: Observable<number | undefined> = new Observable()
  @Input() productList$: Observable<Product[]> = new Observable()
  @Input() productListIsEmpty$: Observable<boolean> = new Observable()
  @Input() isCatalogList$: Observable<boolean> = new Observable()// = this.store.pipe(select(isCatalogList))
  @Output() onSelectItem = new EventEmitter<Product>();
  @ViewChild('searchInput') searchInput: ElementRef = new ElementRef('')
  ProductType = ProductType
  productOrder: ProductOrder = ProductOrder.NONE
  ProductOrder = ProductOrder
  filteredProductList$ = this.productList$

  constructor() { }

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
