import { Component } from '@angular/core';
import { faFolder, faFolderPlus, faFile, faFileCirclePlus, faList } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  folderIcon = faFolder;
  addFolderIcon = faFolderPlus;
  fileIcon = faFile;
  addFileIcon = faFileCirclePlus;
  listIcon = faList;
  groupIcon = faList;

  onclickListIcon() {
    console.log("did click icon");
  }

}
