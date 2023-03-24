import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductType } from '../../enums/product-type';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() items: Product[] = []
  @Output() onItemSelected = new EventEmitter<Product>();

  selectItem(item: Product) {
    this.onItemSelected.emit(item);
  } 

  isCatalog(item: ProductType) {
    return item === ProductType.Catalog
  }

  isCategory(item: ProductType) {
    return item === ProductType.Category || item === ProductType.CategoryVariant
  }

  isFile(item: ProductType) {
    return item === ProductType.File || item === ProductType.FileVariant
  }

}
