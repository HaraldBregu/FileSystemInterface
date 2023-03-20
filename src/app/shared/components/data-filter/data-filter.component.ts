import { Component, EventEmitter, Output } from '@angular/core';
import { faFolder, faFolderPlus, faFile, faFileCirclePlus, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.scss']
})
export class DataFilterComponent {
  @Output() onItemSelected = new EventEmitter();
  folderIcon = faFolder;
  addFolderIcon = faFolderPlus;
  fileIcon = faFile;
  addFileIcon = faFileCirclePlus;
  listIcon = faList;
  groupIcon = faList;

  onclickListIcon() {
    console.log("did click icon");
    this.onItemSelected.emit();
  }
}
