import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataItemType } from 'src/app/core/enums/data-item-type';
import { DataItem } from 'src/app/core/interfaces/data-item';
import { Catalog } from 'src/app/shared/interfaces/catalog';
import { Category } from 'src/app/shared/interfaces/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoryType } from 'src/app/shared/enums/category-type';
import { Store } from '@ngrx/store';
import { dashboardDataSelector } from '../store/selectors/menu.selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  catalogSubscription$: Observable<Catalog | undefined> = new Observable<Catalog | undefined>
  categoriesSubscription$: Observable<Category[]> = new Observable<Category[]>
  isTableList: boolean = true;

  items$: Observable<DataItem[]> = new Observable<DataItem[]>
  items: DataItem[] = []

  constructor(private store: Store, private categoryService: CategoryService) {
    const dashboardSubscription$ = this.store.select(dashboardDataSelector);

    this.catalogSubscription$ = dashboardSubscription$.pipe(map(data => data.selectedCatalog));
    this.categoriesSubscription$ = dashboardSubscription$.pipe(map(data => data.categories));


    this.items$ = dashboardSubscription$.pipe(map(data => data.categories)).pipe(map(data => {
      return data.map(d => {
        return {
          type: DataItemType.Category,
          title: d.name
        }
      })
    }))

    this.items$.pipe().subscribe(data => {
      this.items = data;
    })

  

  }

  ngOnInit() {

  }

  /*
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
    */

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
