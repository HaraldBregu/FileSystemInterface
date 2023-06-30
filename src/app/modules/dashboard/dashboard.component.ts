import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Product } from 'src/app/shared/interfaces/product';
import { selectedProductName, sideMenuOpened } from './store/selectors';
import { getCatalogs, getSearchData, selectProduct } from './store/actions/actions';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedProductName$ = this.store.pipe(select(selectedProductName))
  sideBarMenuOpened$ = this.store.pipe(select(sideMenuOpened))
  currentRoute?: string

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.currentRoute = this.route.snapshot.firstChild?.routeConfig?.path
    })
  }

  goToProductPage() {
    this.navigateToProductPage()
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
    this.store.dispatch(getCatalogs())
    this.router.navigate([
      '/dashboard', {
        outlets: {
          'dashboard-content': 'product'
        }
      }])
  }

  navigateToProductExplorer() {
    this.store.dispatch(getSearchData())
    this.router.navigate([
      '/dashboard', {
        outlets: {
          'dashboard-content': 'explorer'
        }
      }])
  }

}
