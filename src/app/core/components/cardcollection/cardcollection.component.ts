import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faFolder, faFolderPlus, faFile, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Catalog } from '../../interfaces/catalog';

@Component({
  selector: 'app-cardcollection',
  templateUrl: './cardcollection.component.html',
  styleUrls: ['./cardcollection.component.scss']
})
export class CardcollectionComponent implements OnInit, OnChanges {
  @Input() data: Catalog[] = [];
  @Output() onItemSelected = new EventEmitter<Catalog>();

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

  selectCatalog(item: Catalog) {
    this.onItemSelected.emit(item);
  }

}
