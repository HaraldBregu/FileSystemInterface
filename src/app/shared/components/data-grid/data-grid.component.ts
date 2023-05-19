import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductType } from '../../enums/product-type';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent {
  @Input() data: Product[] = [];
  @Output() onItemSelected = new EventEmitter<Product>();

  selectItem(item: Product) {
    this.onItemSelected.emit(item);
  }

  colorForItem(item: Product) {
    switch (item.type) {
      case ProductType.Category:
      case ProductType.CategoryVariant:
        return "text-blue-500";
      case ProductType.File:
      case ProductType.FileVariant:
        return "text-rose-500";
    }
    return "text-blue-500";
  } 

  isCategory(item: ProductType) {
    switch (item) {
      case ProductType.Category:
      case ProductType.CategoryVariant:
        return true;
    }
    return false
  }

  isFile(item: ProductType) {
    switch (item) {
      case ProductType.File:
      case ProductType.FileVariant:
        return true;
    }
    return false
  }
}
