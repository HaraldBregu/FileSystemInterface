import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { selectItemName } from './store/selectors/menu.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  catalogSubscription$: Observable<string> = new Observable<string>

  constructor(private store: Store) {
    this.catalogSubscription$ = this.store.select(selectItemName);

    this.catalogSubscription$.subscribe(item => console.log(item))
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
