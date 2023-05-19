import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, distinctUntilChanged, filter, map } from 'rxjs';
import { ModalEnvironmentsComponent } from 'src/app/shared/modals/modal-environments/modal-environments.component';
import { LocalService } from 'src/app/shared/services/local.service';
import { DashboardModelState, getApiEnvironments, getCatalogs, mainDataSelector, setApiEnv } from 'src/app/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  @ViewChild('modalEnvironment') modalEnvironment?: ModalEnvironmentsComponent

  environmentsObservable$: Observable<DashboardModelState> = this.store.select(mainDataSelector)
  subscription?: Subscription = this.environmentsObservable$
    .pipe(filter(data => data.environments.length > 0))
    .pipe(distinctUntilChanged((prev, curr) => prev.environments === curr.environments))
    .pipe(map(data => data.environments))
    .subscribe(data => {
      this.modalEnvironment?.open(data)
      this.loading = false
    })

  loading = false

  constructor(private router: Router, private store: Store, private localService: LocalService) {

  }

  openModalEnvironments() {
    this.store.dispatch(getApiEnvironments())
    this.loading = true
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  selectEnvironment($event: any) {
    this.localService.setEnvironment($event)
    this.store.dispatch(setApiEnv({ environment: $event }))
    this.store.dispatch(getCatalogs());
    this.navigateToProductPage()
    this.modalEnvironment?.close()
  }

  navigateToProductPage() {
    this.router.navigate([
      '/dashboard', {
        outlets: {
          'dashboard-content': 'product'
        }
      }])
  }
}
