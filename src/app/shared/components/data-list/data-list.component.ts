import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFile, faFileCirclePlus, faFolder, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductType } from '../../enums/product-type';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent {
  @Input() data: Product[] = [];
  @Output() onItemSelected = new EventEmitter<Product>();

  productType = ProductType;

  folderIcon = faFolder;
  addFolderIcon = faFolderPlus;
  fileIcon = faFile;
  addFileIcon = faFileCirclePlus;
  isSyncAnimated = true;

  clickingrow(item: Product) {
    this.onItemSelected.emit(item);
  }

  colorForItem(item: Product)  {
    switch (item.type) {
      case ProductType.Category:
        return "text-blue-500";
      case ProductType.File:
        return "text-rose-500";
    }
    
    return "text-blue-500";
  }  
}
