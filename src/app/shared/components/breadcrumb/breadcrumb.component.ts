import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { DataItem } from 'src/app/core/interfaces/data-item';
import { DataItemType } from 'src/app/core/enums/data-item-type';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() items: DataItem[] = []
  @Output() onItemSelected = new EventEmitter<DataItem>();

  itemTypeCatalog: DataItemType = DataItemType.Catalog
  itemTypeCategory: DataItemType = DataItemType.Category
  itemTypeProduct: DataItemType = DataItemType.Product

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }

  selectItem(item: DataItem) {
    this.onItemSelected.emit(item);
  } 

}
