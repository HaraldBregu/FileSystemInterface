import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataItem } from 'src/app/core/interfaces/data-item';
import { Catalog } from 'src/app/shared/interfaces/catalog';
import { Category } from 'src/app/shared/interfaces/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoryType } from 'src/app/shared/enums/category-type';
import { Store } from '@ngrx/store';
import { dashboardDataSelector } from '../store/selectors/menu.selectors';
import { DataItemType } from 'src/app/core/enums/data-item-type';
import { NavItemModel, NavItemModelType } from '../store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  navItemObservable$: Observable<NavItemModel[]> = new Observable<NavItemModel[]>
  catalogSubscription$: Observable<Catalog | undefined> = new Observable<Catalog | undefined>
  categoriesSubscription$: Observable<Category[]> = new Observable<Category[]>

  isTableList: boolean = true;

  items$: Observable<DataItem[]> = new Observable<DataItem[]>
  items: DataItem[] = []
  navitems: DataItem[] = []

  constructor(private store: Store, private categoryService: CategoryService) {
    const dashboardObservable$ = this.store.select(dashboardDataSelector);

    this.navItemObservable$ = dashboardObservable$.pipe(map(data => data.navItems))
    this.catalogSubscription$ = dashboardObservable$.pipe(map(data => data.selectedCatalog));
    this.categoriesSubscription$ = dashboardObservable$.pipe(map(data => data.categories));

    const f = DataItemType[NavItemModelType.Catalog]

    function mapDataItemTypeToNavItemModelType(dataItemType: NavItemModelType): DataItemType {
      switch (dataItemType) {
        case NavItemModelType.Catalog:
          return DataItemType.Catalog;
        case NavItemModelType.Category:
          return DataItemType.Category;
        case NavItemModelType.Product:
          return DataItemType.Product;
        default:
          throw new Error(`Unsupported DataItemType: ${dataItemType}`);
      }
    }

    this.navItemObservable$.subscribe(data => this.navitems = data.map(item => {
      return {
        title: item.title,
        type: DataItemType[NavItemModelType[item.type] as keyof typeof DataItemType],
        childs: item.childs,
      };
    }))

    this.items$ = dashboardObservable$.pipe(map(data => data.categories)).pipe(map(data => {
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

  selectItem(item: DataItem) {
    console.log(item)
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
