import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, range } from 'rxjs';
import { DataItemType } from 'src/app/core/enums/data-item-type';
import { DataItem } from 'src/app/core/interfaces/data-item';
import { CategoryType } from 'src/app/shared/enums/category-type';
import { Catalog } from 'src/app/shared/interfaces/catalog';
import { Category } from 'src/app/shared/interfaces/category';
import { CatalogService } from 'src/app/shared/services/catalog.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: DataItem[] = [];

  catalogsObservable: Observable<Catalog[]> = new Observable();
  categoryObservable: Observable<Category[]> = new Observable();

  isTableList: boolean = true;

  constructor(
    private catalogService: CatalogService,
    private categoryService: CategoryService) {

    this.cleanDataItems();

    /*
        for (let i = 0; i < 7; i++) {
          this.items.push({
            type: DataItemType.Category,
            title: (Math.random() + 1).toString(36).substring(7),
            childs: Math.floor((Math.random() * 100) + 1),
            data: null
          });
        }
    
        for (let i = 0; i < 67; i++) {
          this.items.push({
            type: DataItemType.File,
            title: (Math.random() + 1).toString(36).substring(7) + ".pdf",
          });
        }*/
  }

  ngOnInit() {
    this.cleanDataItems()
    this.getCategoryFromCatalog()
  }

  getCategoryFromCatalog() {
    this.categoryObservable = this.categoryService.get("CCN_NAVE");
    this.categoryObservable.pipe(map((data: Category[]) => {
      for (const id in data) {
        if (data.hasOwnProperty(id)) {
          const dataItem: DataItem = {
            type: DataItemType.Category,
            title: "",
            subtitle: "",
            childs: 0,
            data: null
          };
          dataItem.type = this.toDataType(data[id].type)
          dataItem.title = data[id].name
          dataItem.childs = 45
          dataItem.data = data[id]
          this.items.push(dataItem)
        }
      }
      return this.items;
    })).subscribe();
  }

  getCategories() {
    this.categoryObservable = this.categoryService.get("CCN_LISTINO", 45);
    this.categoryObservable.pipe(map((data: Category[]) => {
      for (const id in data) {
        if (data.hasOwnProperty(id)) {
          const dataItem: DataItem = {
            type: DataItemType.Category,
            title: "",
            subtitle: "",
            childs: 0,
            data: null
          };
          dataItem.type = this.toDataType(data[id].type)
          dataItem.title = data[id].name
          dataItem.childs = 45
          dataItem.data = data[id]
          this.items.push(dataItem)
        }
      }
      return this.items;
    })).subscribe();
  }

  cleanDataItems() {
    this.items = []
  }
  
  toDataType(category: CategoryType) {
    switch (category) {
      case CategoryType.Category:
        return DataItemType.Category
      case CategoryType.Product:
      case CategoryType.ProductWithVariants:
        return DataItemType.Product
    }
  }

}
