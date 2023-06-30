import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchDataComponent } from '../../components/search-data/search-data.component';
import { SearchDataResult } from '../../interfaces/search-data-result';
import { Store, select } from '@ngrx/store';
import { searchData, searchDataResult } from 'src/app/modules/dashboard/store/selectors';
import { addSearchDataPostFieldEmptyCondition, getSearchDataForCatalog, getSearchDataResult, searchDataPostFieldRemoveConditionAtIndex, setSearchDataLookFor, setSearchDataPostFieldConditionAtIndex, setSearchDataPostFieldNameAtIndex, setSearchDataPostFieldOperatorAtIndex, setSearchDataPostFieldValueAtIndex } from 'src/app/modules/dashboard/store/actions/actions';

@Component({
  selector: 'app-modal-search',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    SearchDataComponent,
  ],
  templateUrl: './modal-search.component.html',
  styleUrls: ['./modal-search.component.scss']
})
export class ModalSearchComponent {
  visible: boolean = false
  @Output() onItemsSelected = new EventEmitter<SearchDataResult[]>()

  searchData$ = this.store.pipe(select(searchData))
  searchDataResult$ = this.store.pipe(select(searchDataResult))

  constructor(private store: Store) {

  }

  open() {
    this.visible = true
  }

  close() {
    this.visible = false
  }

  selectItems(dataList: SearchDataResult[]) {
    this.onItemsSelected.emit(dataList)
    this.visible = false
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

}
