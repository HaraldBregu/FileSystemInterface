import { Component, OnInit } from '@angular/core';
import { Catalog } from 'src/app/core/interfaces/catalog';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { faFolderClosed } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  catalogs: Catalog[] = [];
  faCoffee = faFolderClosed;

  constructor(
    private catalogService: CatalogService,
    private categoryService: CategoryService) {
  }

  ngOnInit(): void {
   
    this.fetchAllCatalogs();
  }

  fetchAllCatalogs() {
    this.catalogService.get().subscribe(catalogs => {
      this.catalogs = catalogs;
    });
  }

  fetchCatalogForId(id: string) {

  }

}
