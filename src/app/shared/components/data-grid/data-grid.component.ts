import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faFolder, faFolderPlus, faFile, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ProductType } from '../../enums/product-type';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit, OnChanges {
  @Input() data: Product[] = [];
  @Output() onItemSelected = new EventEmitter<Product>();

  productTypeCategory = ProductType.Category;
  productTypeFile = ProductType.File;

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

  selectCatalog(item: Product) {
    this.onItemSelected.emit(item);
  }

  isCategoryType(type: ProductType): boolean {
    return type == ProductType.Category
  }

  isFileType(type: ProductType): boolean {
    return type == ProductType.File
  }

  colorForItem(item: Product)  {
    //color: "text-blue-500",
    //color: "text-rose-500",
    switch (item.type) {
      case ProductType.Category:
        return "text-blue-500";
      case ProductType.File:
        return "text-rose-500";
    }
    
    return "text-blue-500";
  }  

}
