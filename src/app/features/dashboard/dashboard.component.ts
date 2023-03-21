import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Catalog } from 'src/app/shared/interfaces/catalog';
import { DashboardModel } from './store';
import { dashboardDataSelector } from './store/selectors/menu.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardSubscription$: Observable<DashboardModel> = new Observable<DashboardModel>
  catalog$: Observable<Catalog | undefined> = new Observable<Catalog | undefined>

  constructor(private store: Store) {
    this.dashboardSubscription$ = this.store.select(dashboardDataSelector);
    this.catalog$ = this.dashboardSubscription$.pipe(map(data => data.selectedCatalog));
    
    this.dashboardSubscription$.subscribe(item => console.log(item))

  }

  ngOnInit(): void {


    /*this.counterSubscription =  this.store.select('dashboard').subscribe((data) => {
      this.counter = data.counter;
    })*/

    //{{counter$.dashboard }}
    //this.counter$ = this.store.select('menu');
  }
/*
  ngOnDestroy(): void {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }*/

}
