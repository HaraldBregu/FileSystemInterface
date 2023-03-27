import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { getCatalogs, getCategories, searchCatalog, selectCatalog } from '../store/actions';
import { dashboardDataSelector } from '../store/selectors';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  catalogsObservable: Observable<Product[]> = new Observable<Product[]>();
  items: Product[] = [];
  menuItems$: Observable<Product[]> = new Observable()
  currentCatalog$: Observable<Product | undefined> = new Observable()
  showCatalogs = false;

  constructor(private store: Store) {
    const dashboardObservable$ = this.store.select(dashboardDataSelector)
    this.menuItems$ = dashboardObservable$.pipe(map(data => data.filteredCatalogs))
    this.currentCatalog$ = dashboardObservable$.pipe(map(data => data.currentCatalog))
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
