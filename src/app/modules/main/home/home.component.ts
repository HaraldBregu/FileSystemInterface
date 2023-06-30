import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCatalogs } from '../../dashboard/store/actions/actions';
import { getPartners } from '../../management/store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private store: Store) {

  }

  navigateToDashboard() {
    this.navigateToDashboardPage()
    setTimeout(() => {
      this.store.dispatch(getCatalogs())
    }, 300)
  }

  navigateToManagement() {
    this.navigateToManagementPage()
    setTimeout(() => {
      this.store.dispatch(getPartners({}))
    }, 300)
  }

  navigateToManagementPage() {
    this.router.navigate(['/management', {
      outlets: {
        'management-content': 'product'
      }
    }])
  }

  navigateToDashboardPage() {
    this.router.navigate([
      '/dashboard', {
        outlets: {
          'dashboard-content': 'product'
        }
      }])
  }
}
