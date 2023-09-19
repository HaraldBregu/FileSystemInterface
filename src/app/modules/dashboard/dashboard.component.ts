import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectedProductName } from './store/selectors';
import { getCatalogs, getSearchData } from './store/actions/actions';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedProductName$ = this.store.pipe(select(selectedProductName))
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
          'content': 'detail-product'
        }
      }])
  }

  navigateToProductPage() {
    this.store.dispatch(getCatalogs())
    this.router.navigate([
      '/dashboard', {
        outlets: {
          'content': 'product'
        }
      }])
  }

  navigateToProductExplorer() {
    this.store.dispatch(getSearchData())
    this.router.navigate([
      '/dashboard', {
        outlets: {
          'content': 'explorer'
        }
      }])
  }

}
