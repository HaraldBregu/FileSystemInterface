import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { getPartnerOperations, getRoleRegistry } from './store/actions';
import { getPartnerRoleOperations } from './store/actions/role-operation';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {
  currentRoute?: string

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute) {

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.currentRoute = this.route.snapshot.firstChild?.routeConfig?.path
    })

  }

  navigateToPartnerListPage() {
    this.router.navigate([
      '/management', {
        outlets: {
          'content': 'partner-detail'
        }
      }
    ])
  }

  navigateToRolesPage() {
    this.store.dispatch(getRoleRegistry())
    this.router.navigate([
      '/management', {
        outlets: {
          'content': 'roles-registry'
        }
      }
    ])
  }

  navigateToRoleOperationPage() {
    this.store.dispatch(getPartnerRoleOperations())
    this.router.navigate([
      '/management', {
        outlets: {
          'content': 'role-operation'
        }
      }
    ])
  }

  navigateToPartnerOperationsPage() {
    this.store.dispatch(getPartnerOperations())
    this.router.navigate([
      '/management', {
        outlets: {
          'content': 'partner-operations'
        }
      }
    ])
  }

  confirm() {

  }

  cancel() {

  }

}
