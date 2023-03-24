import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { getCatalogs, getCategories, searchCatalog, selectCatalog } from '../store/actions';
import { dashboardDataSelector } from '../store/selectors';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  catalogsObservable: Observable<Product[]> = new Observable<Product[]>();
  items: Product[] = [];
  menuItems$: Observable<Product[]> = new Observable()     
  currentCatalog$: Observable<Product | undefined> = new Observable()
  showCatalogs = false;

  constructor(library: FaIconLibrary, private store: Store) {

    library.addIconPacks(fas, far);

    const dashboardObservable$ = this.store.select(dashboardDataSelector)
    this.menuItems$ = dashboardObservable$.pipe(map(data => data.filteredCatalogs))
    this.currentCatalog$ = dashboardObservable$.pipe(map(data => data.currentCatalog))

    //this.menuItems$.subscribe(data => console.log(data))
  }

  toggleCatalogs() {
    this.showCatalogs = !this.showCatalogs; 
    this.store.dispatch(getCatalogs());
  }

  selectCatalog(item: Product) {
    this.store.dispatch(selectCatalog({ product: item }));
    this.store.dispatch(getCategories({ catalog: item }));
  }

  onInputType(input: any) {
    this.store.dispatch(searchCatalog({ catalog_name: input.inputValue }));
  }

}
