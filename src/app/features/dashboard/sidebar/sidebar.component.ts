import { Component, OnInit } from '@angular/core';
import { faFolder, faFolderPlus, faFile, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Catalog } from 'src/app/shared/interfaces/catalog';
import { CatalogService } from 'src/app/shared/services/catalog.service';
import { selectCatalog } from '../store/actions/menu.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  catalogsObservable: Observable<Catalog[]> = new Observable();
  items: Catalog[] = [];

  folderIcon = faFolder;
  addFolderIcon = faFolderPlus;
  fileIcon = faFile;
  addFileIcon = faFileCirclePlus;

  showCatalogs = false;

  constructor(private catalogService: CatalogService, private store: Store) {

  }

  ngOnInit() {

  }

  getAllCatalogs() {
    this.catalogsObservable = this.catalogService.getAll();
    this.catalogsObservable.pipe(map((data: Catalog[]) => {
      console.log(data)
      this.items = data;
      return data;
    })).subscribe();
  }

  toggleCatalogs() {
    this.showCatalogs = !this.showCatalogs
    this.getAllCatalogs()

  }

  selectCatalog(item: Catalog) {
    console.log(item);
    this.store.dispatch(selectCatalog(item));
  }
}
