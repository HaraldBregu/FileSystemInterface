import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFile, faFileCirclePlus, faFolder, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductItemType } from '../../enums/product-item-type';
import { ProductItem } from '../../interfaces/product-item';

@Component({
  selector: 'app-listcollection',
  templateUrl: './listcollection.component.html',
  styleUrls: ['./listcollection.component.scss']
})
export class ListcollectionComponent {
  @Input() data: ProductItem[] = [];
  @Output() onItemSelected = new EventEmitter<ProductItem>();

  productItemType = ProductItemType;

  folderIcon = faFolder;
  addFolderIcon = faFolderPlus;
  fileIcon = faFile;
  addFileIcon = faFileCirclePlus;
  isSyncAnimated = true;

  
  selectProductItem(item: ProductItem) {
    this.onItemSelected.emit(item);
  }

  rowClick() {
    console.log("test row click");
  }
}
