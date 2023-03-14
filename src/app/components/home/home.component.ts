import { Component, OnInit } from '@angular/core';
import { Catalog } from 'src/app/core/interfaces/catalog';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  catalogs: Catalog[] = [];
    
  constructor(
    private catalogService: CatalogService,
    private categoryService: CategoryService) {

      //this._catalogService = catalogService;
    //this.catalogService.getCatalogs();
  }

  ngOnInit(): void {
    this.catalogService.getCatalogs("date").subscribe(catalogs => {
      this.catalogs = catalogs;
    });
  }

}
