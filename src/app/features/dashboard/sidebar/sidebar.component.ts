import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Catalog } from 'src/app/shared/interfaces/catalog';
import { DashboardModel } from '../store';
import { getCatalogs, getCategories, selectCatalog } from '../store/actions';
import { dashboardDataSelector } from '../store/selectors/menu.selectors';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  catalogsObservable: Observable<Catalog[]> = new Observable();
  items: Catalog[] = [];
  showCatalogs = false;
  menuStateItems$: Observable<DashboardModel> = new Observable<DashboardModel>
  menuItems$: Observable<Catalog[]> = new Observable<Catalog[]>

  constructor(
    library: FaIconLibrary,
    private store: Store) {

    library.addIconPacks(fas, far);

    this.menuStateItems$ = this.store.select(dashboardDataSelector);
    this.menuStateItems$.subscribe(item => console.log(item));
    this.menuItems$ = this.menuStateItems$.pipe(map(data => data.catalogs));
  }

  toggleCatalogs() {
    this.showCatalogs = !this.showCatalogs
    this.store.dispatch(getCatalogs());
  }

  selectCatalog(item: Catalog) {
    this.store.dispatch(selectCatalog(item));
    this.store.dispatch(getCategories({ catalog_name: item.name }));
  }

}
