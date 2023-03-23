import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
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

  productTypeCatalog = ProductType.Catalog
  productTypeCategory = ProductType.Category
  productTypeFile = ProductType.File

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }

  selectItem(item: Product) {
    this.onItemSelected.emit(item);
  } 

}
