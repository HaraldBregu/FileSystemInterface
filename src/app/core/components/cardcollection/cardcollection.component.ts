import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faFolder, faFolderPlus, faFile, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ProductItemType } from '../../enums/product-item-type';
import { ProductItem } from '../../interfaces/product-item';

@Component({
  selector: 'app-cardcollection',
  templateUrl: './cardcollection.component.html',
  styleUrls: ['./cardcollection.component.scss']
})
export class CardcollectionComponent implements OnInit, OnChanges {
  @Input() data: ProductItem[] = [];
  @Output() onItemSelected = new EventEmitter<ProductItem>();

  folderIcon = faFolder;
  addFolderIcon = faFolderPlus;
  fileIcon = faFile;
  addFileIcon = faFileCirclePlus;
  isSyncAnimated = true;

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("data changed");
  }

  selectCatalog(item: ProductItem) {
    this.onItemSelected.emit(item);
  }

  isCategoryType(type: ProductItemType): boolean {
    return type == ProductItemType.Category
  }

  isFileType(type: ProductItemType): boolean {
    return type == ProductItemType.File
  }


}
