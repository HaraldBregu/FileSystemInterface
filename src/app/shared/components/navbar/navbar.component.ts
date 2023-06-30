import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, distinctUntilChanged, filter, map } from 'rxjs';
import { ModalEnvironmentsComponent } from '../../modals/modal-environments/modal-environments.component';
import { LocalService } from '../../services/local.service';
import { currentAPIEnvironment, getEnvironmentList, isDarkTheme } from 'src/app/store/selectors';
import { clearDashboardData, getCatalogs, toggleDashboardSideMenu } from 'src/app/modules/dashboard/store/actions/actions';
import { getApiEnvironments, setApiEnv, toggleTheme } from 'src/app/store/actions';
import { getPartners } from 'src/app/modules/management/store/actions';

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

export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('modalEnvironment') modalEnvironment?: ModalEnvironmentsComponent
  @Input() dashboardBarMenu: boolean = false;
  @Input() navItems: any = [];
  @Input() currentEnvironment: string = ''
  @Output() clickMenu = new EventEmitter();

  darkTheme$ = this.store.pipe(select(isDarkTheme))
  currEnvironment$ = this.store.pipe(select(currentAPIEnvironment))
  darkThemeObservable$ = this.store.pipe(select(isDarkTheme))

  currentRoute?: string
  routerSubscribtion$?: Subscription

  darkThemeSubscribtion$ = this.darkThemeObservable$.subscribe(darkTheme => {
    if (darkTheme) {
      document.documentElement.classList.add('dark')
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
      }
    }
  })

  environementListSubscription$ = this.store.pipe(select(getEnvironmentList))
    .pipe(distinctUntilChanged((prev, curr) => prev === curr))
    .pipe(filter(data => data.length > 0))
    .subscribe(data => {
      this.modalEnvironment?.open(data)
    })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private localService: LocalService) {

    this.routerSubscribtion$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((data) => {
      this.currentRoute = this.route.snapshot.root.firstChild?.routeConfig?.path
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.environementListSubscription$?.unsubscribe()
    this.darkThemeSubscribtion$.unsubscribe()
    this.routerSubscribtion$?.unsubscribe()
  }

  toggleSideMenu() {
    this.store.dispatch(toggleDashboardSideMenu())
  }

  getApiEnvironments() {
    this.store.dispatch(getApiEnvironments())
  }

  selectEnvironment($event: any) {
    this.localService.setEnvironment($event)
    this.store.dispatch(setApiEnv({ environment: $event }))
    //this.store.dispatch(getCatalogs())
    //this.navigateToDashboardPage()
    this.modalEnvironment?.close()
  }

  toggleTheme() {
    this.store.dispatch(toggleTheme())
  }

  exit() {
    this.store.dispatch(clearDashboardData())
    this.navigateToHomePage()
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

  navigateToDashboardPage() {
    this.router.navigate([
      '/dashboard', {
        outlets: {
          'dashboard-content': 'product'
        }
      }
    ])
  }

  navigateToManagementPage() {
    this.router.navigate([
      '/management', {
        outlets: {
          'management-content': 'partner-detail'
        }
      }
    ])
  }

  navigateToHomePage() {
    this.router.navigate([''])
  }
}
