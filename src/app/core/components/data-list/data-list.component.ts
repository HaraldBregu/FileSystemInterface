import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFile, faFileCirclePlus, faFolder, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { DataItemType } from '../../enums/data-item-type';
import { DataItem } from '../../interfaces/data-item';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent {
  @Input() data: DataItem[] = [];
  @Output() onItemSelected = new EventEmitter<DataItem>();

  dataItemType = DataItemType;

  folderIcon = faFolder;
  addFolderIcon = faFolderPlus;
  fileIcon = faFile;
  addFileIcon = faFileCirclePlus;
  isSyncAnimated = true;

  
  selectProductItem(item: DataItem) {
    this.onItemSelected.emit(item);
  }

  rowClick() {
    console.log("test row click");
  }

  colorForItem(item: DataItem)  {
    //color: "text-blue-500",
    //color: "text-rose-500",
    switch (item.type) {
      case DataItemType.Category:
        return "text-blue-500";
      case DataItemType.File:
        return "text-rose-500";
    }
    
    return "text-blue-500";
  }  
}
