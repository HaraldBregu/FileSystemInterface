import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardDataSelector, getSearchFilters, getSearchResult } from 'src/app/store';
import { Observable, Subscription, filter, map } from 'rxjs';
import { SearchData, SearchDataField, SearchDataPostFieldInitial, SearchFieldType, SearchPostField } from '../../interfaces/search-data';
import { Store } from '@ngrx/store';
import { SearchDataResult } from '../../interfaces/search-data-result';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-search-data',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.scss']
})
export class SearchDataComponent implements OnInit, OnDestroy {
  dashboardObservable$ = this.store.select(dashboardDataSelector);
  searchDataObservable$: Observable<SearchData | undefined> =
    this.dashboardObservable$
      .pipe(filter(data => data.searchData !== undefined || data.searchData !== null))
      .pipe(map(data => data.searchData))
  searchDataResultObservable$: Observable<SearchDataResult[]> =
    this.dashboardObservable$
      .pipe(map(data => data.searchDataResult))
  subscribtion?: Subscription = this.searchDataObservable$.subscribe(data => this.searchData = data)

  searchData: SearchData | undefined
  searchDataFieldSelected: SearchDataField | undefined
  searchDataPostFields: SearchPostField[] = []
  searchDataPostField: SearchPostField = { ...SearchDataPostFieldInitial }
  inputValue: string = ''
  showSearchFields: boolean = true
  SearchFieldType = SearchFieldType
  toggleOrderDisplayName: boolean = true
  toggleOrderCategoryName: boolean = true
  orderDisplayName = false
  orderCategoryName = false

  constructor(private store: Store) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe()
  }

  selectLookIn($event: any) {
    if (!this.searchData)
      return

    const newSearchData = { ...this.searchData }
    newSearchData.lookinselected = $event.target.value
    this.searchData = newSearchData
  }

  selectLookFor($event: any) {
    if (!this.searchData)
      return

    const newSearchData = { ...this.searchData }
    newSearchData.lookforselected = $event.target.value
    this.searchData = newSearchData
  }

  selectResultsPerPage($event: any) {
    if (!this.searchData)
      return

    const newSearchData = { ...this.searchData }
    newSearchData.resultperpageselected = $event.target.value
    this.searchData = newSearchData
  }

  selectField($event: any, searchData: SearchData) {
    const value = $event.target.value

    this.searchDataFieldSelected = searchData.fields.find(option => option.fieldvalue === value)
    this.searchDataPostField.field = value
    this.searchDataPostField.fieldtype = this.searchDataFieldSelected?.fieldtype ?? 0
  }

  updateSelectedField(field: SearchPostField, $event: any) {
    const value = $event.target.value
    field.field = value
    field.condition = ''
    field.logicaloperator = ''
    field.value = ''
  }

  selectOperator($event: any, field: SearchPostField) {
    field.logicaloperator = $event.target.value
  }

  operatorsForField(searchData: SearchData, index: number) {
    return searchData.fields
      .find(data => data.fieldvalue === this.searchDataPostFields[index].field)?.operators
  }

  selectCondition($event: any, postField: SearchPostField) {
    const value = $event.target.value
    postField.condition = value
  }

  conditionsForField(searchData: SearchData, index: number) {
    return searchData.fields
      .find(data => data.fieldvalue === this.searchDataPostFields[index].field)?.conditions
  }

  setConditionValue($event: any, postField: SearchPostField) {
    const value = $event.target.value
    postField.value = value
  }

  addCondition(postField: SearchPostField) {
    this.showSearchFields = true

    if (this.conditionIsComplete(postField) && this.searchData) {
      this.searchDataPostFields.push({ ...postField })
      this.searchDataFieldSelected = undefined
      this.searchDataPostField = { ...SearchDataPostFieldInitial }

      const newSearchData = { ...this.searchData }
      newSearchData.postfields = this.searchDataPostFields
      this.searchData = newSearchData
    }
  }

  removeCondition(index: number) {
    if (this.searchData && this.searchDataPostFields.length > 0) {
      console.log(JSON.stringify(this.searchDataPostFields))

      
      this.searchDataPostFields.splice(index, 1)

      const newSearchData = { ...this.searchData }
      newSearchData.postfields = this.searchDataPostFields
      this.searchData = newSearchData
    }
  }

  searchProducts() {
    if (this.baseParamsAreCompleted() && this.searchData) {
      this.store.dispatch(getSearchResult({ searchData: this.searchData }))
    }
  }

  toggleOrderByDisplayName() {
    this.orderDisplayName = true
    this.orderCategoryName = false
    this.toggleOrderDisplayName = !this.toggleOrderDisplayName

    this.searchDataResultObservable$ = this.searchDataResultObservable$.pipe(map(data => {
      return data.slice().sort((a, b) => this.toggleOrderDisplayName ?
        b.displayname.toLowerCase().localeCompare(a.displayname.toLowerCase()) :
        a.displayname.toLowerCase().localeCompare(b.displayname.toLowerCase()))
    }))
  }

  toggleOrderByCategoryName() {
    this.orderDisplayName = false
    this.orderCategoryName = true
    this.toggleOrderCategoryName = !this.toggleOrderCategoryName

    this.searchDataResultObservable$ = this.searchDataResultObservable$.pipe(map(data => {
      return data.slice().sort((a, b) => this.toggleOrderCategoryName ?
        b.categoryname.toLowerCase().localeCompare(a.categoryname.toLowerCase()) :
        a.categoryname.toLowerCase().localeCompare(b.categoryname.toLowerCase())
      )
    }))
  }

  // UTILS

  baseParamsAreCompleted() {
    if (this.searchData &&
      this.searchData.lookinselected &&
      this.searchData.lookforselected &&
      this.searchData.resultperpageselected)
      return true

    return false
  }

  conditionIsComplete(postFieldData: SearchPostField) {
    if ((this.searchDataPostFields.length > 0 && postFieldData.logicaloperator.length === 0) ||
      postFieldData.field.length === 0 ||
      postFieldData.condition.length === 0 ||
      postFieldData.value.length === 0)
      return false

    return true
  }

}
