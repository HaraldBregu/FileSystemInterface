import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faFolder, faFolderPlus, faFile, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { DataItemType } from '../../enums/data-item-type';
import { DataItem } from '../../interfaces/data-item';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit, OnChanges {
  @Input() data: DataItem[] = [];
  @Output() onItemSelected = new EventEmitter<DataItem>();

  dataItemTypeCategory: DataItemType = DataItemType.Category;
  dataItemTypeProduct: DataItemType = DataItemType.Product;

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

  selectCatalog(item: DataItem) {
    this.onItemSelected.emit(item);
  }

  isCategoryType(type: DataItemType): boolean {
    return type == DataItemType.Category
  }

  isFileType(type: DataItemType): boolean {
    return type == DataItemType.Product
  }

  colorForItem(item: DataItem)  {
    //color: "text-blue-500",
    //color: "text-rose-500",
    switch (item.type) {
      case DataItemType.Category:
        return "text-blue-500";
      case DataItemType.Product:
        return "text-rose-500";
    }
    
    return "text-blue-500";
  }  

}
