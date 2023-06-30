import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { SearchDataResult } from 'src/app/shared/interfaces/search-data-result';
import {
  searchData,
  searchDataLoading,
  searchDataResult
} from '../store/selectors';
import {
  addSearchDataPostFieldEmptyCondition,
  getSearchDataForCatalog,
  getSearchDataResult,
  searchDataPostFieldRemoveConditionAtIndex,
  selectSearchResult,
  setSearchDataLookFor,
  setSearchDataPostFieldConditionAtIndex,
  setSearchDataPostFieldNameAtIndex,
  setSearchDataPostFieldOperatorAtIndex,
  setSearchDataPostFieldValueAtIndex
} from '../store/actions/actions';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent {
  searchDataLoading$ = this.store.pipe(select(searchDataLoading))
  searchData$ = this.store.pipe(select(searchData))
  searchDataResult$ = this.store.pipe(select(searchDataResult))

  constructor(private store: Store, private router: Router) {

  }

  selectItem(item: SearchDataResult) {
    this.store.dispatch(selectSearchResult({ searchDataResult: item }))
    this.navigateToProductPage()
  }

  selectCatalogName(name: string) {
    this.store.dispatch(getSearchDataForCatalog({ catalogName: name }))
  }

  selectProductType(name: string) {
    this.store.dispatch(setSearchDataLookFor({ value: name }))
  }

  setOperator($event: any) {
    this.store.dispatch(setSearchDataPostFieldOperatorAtIndex({ operator: $event.operator, index: $event.index }))
  }

  setPostField($event: any) {
    this.store.dispatch(setSearchDataPostFieldNameAtIndex({ fieldName: $event.fieldName, fieldType: $event.fieldType, index: $event.index }))
  }

  setPostFieldCondition($event: any) {
    this.store.dispatch(setSearchDataPostFieldConditionAtIndex({ condition: $event.condition, index: $event.index }))
  }

  setPostFieldValue($event: any) {
    this.store.dispatch(setSearchDataPostFieldValueAtIndex({ fieldValue: $event.fieldValue, index: $event.index }))
  }

  addEmptyCondition() {
    this.store.dispatch(addSearchDataPostFieldEmptyCondition())
  }

  removeCondition($event: any) {
    this.store.dispatch(searchDataPostFieldRemoveConditionAtIndex({ index: $event.index }))
  }

  getSearchDataResult() {
    this.store.dispatch(getSearchDataResult())
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
