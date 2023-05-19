import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { dashboardDataSelector, getCatalogs, getCategories, searchCatalog, selectCatalog } from 'src/app/store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  catalogsObservable: Observable<Product[]> = new Observable<Product[]>();
  items: Product[] = [];
  menuItems$: Observable<Product[]> = new Observable()
  selectedProductObserver$: Observable<Product | undefined> = new Observable()
  currentCatalog$: Observable<Product | undefined> = new Observable()
  showCatalogs = false;

  constructor(private store: Store) {
    const dashboardObservable$ = this.store.select(dashboardDataSelector)
    this.menuItems$ = dashboardObservable$.pipe(map(data => data.filteredCatalogs))
    this.currentCatalog$ = dashboardObservable$.pipe(map(data => data.currentCatalog))
    this.selectedProductObserver$ = dashboardObservable$.pipe(map(data => data.navItems.at(-1)))
  }

  toggleCatalogs() {
    this.showCatalogs = !this.showCatalogs;
    this.store.dispatch(getCatalogs());
  }

  selectCatalog(item: Product) {
    this.store.dispatch(selectCatalog({ catalog: item }));
    this.store.dispatch(getCategories({ catalog: item }));
  }

  onInputType(input: any) {
    this.store.dispatch(searchCatalog({ catalog_name: input.inputValue }));
  }

}
