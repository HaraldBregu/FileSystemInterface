import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { SearchData } from 'src/app/shared/interfaces/search-data';
import { dashboardDataSelector, getSearchFilters } from 'src/app/store';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {
  dashboardObservable$ = this.store.select(dashboardDataSelector);
  searchDataObservable$: Observable<SearchData | undefined> =
    this.dashboardObservable$
      .pipe(map(data => data.searchData))

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(getSearchFilters({}))
  }

}
