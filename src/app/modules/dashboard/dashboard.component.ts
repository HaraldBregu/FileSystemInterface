import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { dashboardDataSelector, getCatalogs, getCategories, getSearchFilters, searchCatalog, selectCatalog } from 'src/app/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  dashboardObservable$ = this.store.select(dashboardDataSelector)

  catalogsObservable: Observable<Product[]> = new Observable<Product[]>();
  items: Product[] = [];

  menuItems$: Observable<Product[]> = this.dashboardObservable$
    .pipe(map(data => data.filteredCatalogs))
  selectedProductObserver$: Observable<Product | undefined> = this.dashboardObservable$
    .pipe(map(data => data.navItems.at(-1)))
  currentCatalog$: Observable<Product | undefined> = this.dashboardObservable$
    .pipe(map(data => data.currentCatalog))
  sideBarMenuOpened$: Observable<boolean> = this.dashboardObservable$
    .pipe(map(data => data.dashboardSideMenuOpened))

  showCatalogs = false;

  constructor(private store: Store, private router: Router) {

  }

  toggleCatalogs() {
    this.showCatalogs = !this.showCatalogs;
    this.store.dispatch(getCatalogs());
    this.navigateToProductPage()
  }

  selectCatalog(item: Product) {
    this.store.dispatch(selectCatalog({ catalog: item }));
    this.store.dispatch(getCategories({ catalog: item }));
    this.navigateToProductPage()
  }

  onInputType(input: any) {
    this.store.dispatch(searchCatalog({ catalog_name: input.inputValue }));
  }

  navigateToProductDetailPage() {
    this.router.navigate([
      '/dashboard', {
        outlets: {
          'dashboard-content': 'detail-product'
        }
      }])
  }

  navigateToProductPage() {
    this.router.navigate([
      '/dashboard', {
        outlets: {
          'dashboard-content': 'product'
        }
      }])
  }

  navigateToProductExplorer() {
    this.router.navigate([
      '/dashboard', {
        outlets: {
          'dashboard-content': 'explorer'
        }
      }])
  }

}
