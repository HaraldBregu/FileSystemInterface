import { Component, OnInit } from '@angular/core';
import { Catalog } from 'src/app/core/interfaces/catalog';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { faFolder, faFolderPlus, faFile, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  catalogs: Catalog[] = [];
  folderIcon = faFolder;
  addFolderIcon = faFolderPlus;
  fileIcon = faFile;
  addFileIcon = faFileCirclePlus;

  constructor(
    private catalogService: CatalogService,
    private categoryService: CategoryService) {
  }

  ngOnInit(): void {
   
    //this.fetchAllCatalogs();

    this.catalogs.push({ id: 1, name:"ALPHA", content:34});
    this.catalogs.push({ id: 2, name:"BETA", content:8});
    this.catalogs.push({ id: 3, name:"TETRA", content:3});
    this.catalogs.push({ id: 4, name:"OMEGA", content:12});
    this.catalogs.push({ id: 5, name:"GAMMA", content:95});
  }

  fetchAllCatalogs() {
    this.catalogService.get().subscribe(catalogs => {
      this.catalogs = catalogs;
    });
  }

  fetchCatalogForId(id: string) {

  }

  selectCatalog(item: Catalog) {
    console.log(item);
  }

}
