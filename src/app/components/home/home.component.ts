import { Component } from '@angular/core';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private catalogService: CatalogService,
    private categoryService: CategoryService) {

    //this.catalogService.getCatalogs();
  }
}
