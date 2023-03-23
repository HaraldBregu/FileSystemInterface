import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Store } from '@ngrx/store';
import { dashboardDataSelector } from '../store/selectors';
import { getCategories, getSubCategories } from '../store';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductType } from 'src/app/shared/enums/product-type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  catalogSubscription$: Observable<Product | undefined> = new Observable<Product | undefined>
  categoriesSubscription$: Observable<Product[]> = new Observable<Product[]>

  isTableList: boolean = true;

  items$: Observable<Product[]> = new Observable()
  items: Product[] = []

  navitems: Product[] = []

  selectedCatalog: Product | undefined

  constructor(private store: Store, private categoryService: CategoryService) {
    const dashboardObservable$ = this.store.select(dashboardDataSelector);

    dashboardObservable$
      .pipe(map(data => data.navItems))
      .subscribe(product => this.navitems = product)

    this.items$ = dashboardObservable$.pipe(map(data => data.categories))
    this.items$.subscribe(product => this.items = product)

    this.catalogSubscription$ = dashboardObservable$.pipe(map(data => data.selectedCatalog));
    this.categoriesSubscription$ = dashboardObservable$.pipe(map(data => data.categories));

    this.catalogSubscription$.subscribe(catalog => this.selectedCatalog = catalog)


    /*
        this.items$ = dashboardObservable$.pipe(map(data => data.categories)).pipe(map(data => {
          return data.map(d => {
            return {
              id: d.id,
              type: ProductType.Category,
              name: d.name,
            }
          })
        }))
    */
    /*
     this.items$.pipe().subscribe(data => {
       this.items = data;
     })*/

  }

  ngOnInit() {

  }

  selectBreadcrumbItem(item: Product) {
    switch (item.type) {
      case ProductType.Catalog:
        this.store.dispatch(getCategories({ catalog_name: item.name }));
        break
      case ProductType.Category:
      case ProductType.File:
    }
  }

  selectCategory(item: Product) {
    const catalogName = this.selectedCatalog?.name ?? ""

    this.store.dispatch(getSubCategories({ catalog_name: catalogName, category_name: item.name, category_id: item.id }));
  }

}
