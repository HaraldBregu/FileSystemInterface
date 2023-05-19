import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { getApiEnvironments, mainDataSelector, setApiEnv, toggleDashboardSideMenu } from 'src/app/store';
import { Observable, Subscription, distinctUntilChanged, filter, map } from 'rxjs';
import { ModalEnvironmentsComponent } from '../../modals/modal-environments/modal-environments.component';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ModalEnvironmentsComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnDestroy {
  @ViewChild('modalEnvironment') modalEnvironment?: ModalEnvironmentsComponent

  @Input() navItems: any = [];
  @Output() clickMenu = new EventEmitter();

  environmentsObservable$ = this.store.select(mainDataSelector)
  currEnvironment$: Observable<string | undefined> = this.environmentsObservable$
    .pipe(filter(data => data.apiEnvironment !== undefined))
    .pipe(map(data => data.apiEnvironment))
  subscription?: Subscription = this.environmentsObservable$
    .pipe(filter(data => data.environments.length > 0))
    .pipe(distinctUntilChanged((prev, curr) => prev.environments === curr.environments))
    .pipe(map(data => data.environments))
    .subscribe(data => {
      this.modalEnvironment?.open(data)
    })

  constructor(private router: Router, private store: Store, private localService: LocalService) {

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  toggleSideMenu() {
    this.store.dispatch(toggleDashboardSideMenu())
  }

  navigateToProductExplorer() {
    this.store.dispatch(getApiEnvironments())
  }

  selectEnvironment($event: any) {
    this.localService.setEnvironment($event)
    this.store.dispatch(setApiEnv({ environment: $event }))
    this.modalEnvironment?.close()

    this.router.navigate([
      '/dashboard', {
        outlets: {
          'dashboard-content': 'explorer'
        }
      }])
  }

}
