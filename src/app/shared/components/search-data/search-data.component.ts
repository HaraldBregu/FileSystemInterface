import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { SearchData, SearchDataField, SearchFieldType, SearchPostField } from '../../interfaces/search-data';
import { SearchDataResult } from '../../interfaces/search-data-result';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductType } from '../../enums/product-type';

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
export class SearchDataComponent {
  @Input() searchData$: Observable<SearchData | undefined> = new Observable()
  @Input() searchDataResult$: Observable<SearchDataResult[]> = new Observable()
  @Input() selectable: boolean = true
  @Output() onSelectItem = new EventEmitter<SearchDataResult>()
  @Output() onSelectItems = new EventEmitter<SearchDataResult[]>()
  @Output() onSearchData = new EventEmitter()

  searchDataFieldSelected: SearchDataField | undefined

  inputValue: string = ''
  SearchFieldType = SearchFieldType
  toggleOrderDisplayName: boolean = true
  toggleOrderCategoryName: boolean = true
  orderDisplayName = false
  orderCategoryName = false
  selectedData: SearchDataResult[] = []

  currentPage = 1
  itemsPerPage = 20
  showItemsPerPage = false
  ProductType = ProductType

  @Output() onSelectCatalogName = new EventEmitter<string>();
  @Output() onSelectProductType = new EventEmitter<string>();
  @Output() onSetOperator = new EventEmitter<{ operator: string, index: number }>();
  @Output() onSetPostField = new EventEmitter<{ fieldName: string, fieldType: SearchFieldType, index: number }>();
  @Output() onSetPostFieldCondition = new EventEmitter<{ condition: string, index: number }>();
  @Output() onSetPostFieldValue = new EventEmitter<{ fieldValue: string, index: number }>();
  @Output() onAddEmptyCondition = new EventEmitter();
  @Output() onRemoveCondition = new EventEmitter<{ index: number }>();
  @Output() onGetSearchDataResult = new EventEmitter();

  constructor() { }

  /// [LOOKIN] select

  selectLookIn($event: any) {
    this.onSelectCatalogName.emit($event.target.value)
  }

  /// [LOOKFOR] select

  selectLookFor($event: any) {
    this.onSelectProductType.emit($event.target.value)
  }

  /// [OPERATORS] select

  selectOperator($event: any, index: number) {
    this.onSetOperator.emit({ operator: $event.target.value, index: index })
  }

  /// [OPERATORS] list

  operatorsForField(searchData: SearchData, index: number) {
    return searchData.fields[0].operators//.find(data => data.fieldvalue === this.searchDataPostFields[index].field)?.operators
  }

  /// [FIELD] set

  updatePostFieldAtIndex($event: any, index: number, searchData: SearchData) {
    const value = $event.target.value
    const fields = searchData.fields
    let dataIndex = fields.findIndex(item => item.fieldtext === value)
    const field = fields[dataIndex]

    if (field === undefined) {
      this.onSetPostField.emit({ fieldName: "", fieldType: SearchFieldType.NoType, index: index })
      return
    }

    if (!field.fieldtype)
      return

    this.onSetPostField.emit({ fieldName: value, fieldType: field.fieldtype, index: index })
  }

  /// [CONDITION] select

  selectPostFieldConditionAtIndex($event: any, index: number) {
    this.onSetPostFieldCondition.emit({ condition: $event.target.value, index: index })
  }

  /// [CONDITION] list

  conditionsForField(fieldValue: string, searchData: SearchData) {
    const fields = searchData.fields
    let index = fields.findIndex(item => item.fieldvalue === fieldValue)
    return index >= 0 ? fields[index].conditions : []
  }

  /// [VALUE] set

  setValueForField($event: any, index: number) {
    this.onSetPostFieldValue.emit({ fieldValue: $event.target.value, index: index })
  }

  isChecked(value: string) {
    if (value.length === 0)
      return false

    const result = Boolean(JSON.parse(value))
    return result
  }

  setCheckBoxValueForField(value: string, index: number) {
    if (value.length === 0)
      value = "false"

    var result = Boolean(JSON.parse(value))
    result = !result
    var strBool = result ? "true" : "false"

    this.onSetPostFieldValue.emit({ fieldValue: strBool, index: index })
  }

  valuesForSelectedFieldAtIndex(index: number, searchData: SearchData) {
    const fields = searchData.fields
    const fieldName = searchData.postfields[index].field
    let dataIndex = fields.findIndex(item => item.fieldtext === fieldName)
    return searchData.fields[dataIndex].values
  }

  /// [CONDITION] add empty

  addEmptyCondition() {
    this.onAddEmptyCondition.emit()
  }

  /// [CONDITION] remove

  removeCondition(index: number) {
    this.onRemoveCondition.emit({ index: index })
  }

  /// [ACTION] search

  searchProducts(searchData: SearchData) {
    if (this.baseParamsAreCompleted(searchData)) {
      this.onGetSearchDataResult.emit()
    }
  }

  /// [ACTION] selected products 

  selectProducts() {
    this.onSelectItems.emit(this.selectedData)
  }

  selectItem(item: SearchDataResult) {
    if (this.selectable) {
      const index = this.selectedData.indexOf(item)
      if (index > -1) {
        this.selectedData.splice(index, 1);
      } else {
        this.selectedData.push(item)
      }
    } else {
      this.onSelectItem.emit(item)
    }
  }

  selected(item: SearchDataResult) {
    return this.selectedData.includes(item)
  }

  /// [UTILS] 

  toggleOrderByDisplayName() {
    this.orderDisplayName = true
    this.orderCategoryName = false
    this.toggleOrderDisplayName = !this.toggleOrderDisplayName

    this.searchDataResult$ = this.searchDataResult$.pipe(map(data => {
      return data.slice().sort((a, b) => this.toggleOrderDisplayName ?
        b.displayname.toLowerCase().localeCompare(a.displayname.toLowerCase()) :
        a.displayname.toLowerCase().localeCompare(b.displayname.toLowerCase()))
    }))
  }

  toggleOrderByCategoryName() {
    this.orderDisplayName = false
    this.orderCategoryName = true
    this.toggleOrderCategoryName = !this.toggleOrderCategoryName

    this.searchDataResult$ = this.searchDataResult$.pipe(map(data => {
      return data.slice().sort((a, b) => this.toggleOrderCategoryName ?
        b.categoryname.toLowerCase().localeCompare(a.categoryname.toLowerCase()) :
        a.categoryname.toLowerCase().localeCompare(b.categoryname.toLowerCase())
      )
    }))
  }

  // UTILS

  baseParamsAreCompleted(searchData: SearchData) {
    if (searchData.lookinselected && searchData.lookforselected)
      return true

    return false
  }

  conditionIsComplete(postFieldData: SearchPostField) {
    /* if ((this.searchDataPostFields.length > 0 && postFieldData.logicaloperator.length === 0) ||
       postFieldData.field.length === 0 ||
       postFieldData.condition.length === 0 ||
       postFieldData.value.length === 0)
       return false*/

    return true
  }


  prevPage() {
    return (this.currentPage === 1) ? 1 : --this.currentPage
  }

  nextPage(list: SearchDataResult[]) {
    return (this.currentPage === this.getPageCount(list)) ? this.getPageCount(list) : ++this.currentPage
  }

  prevPageNumber(page: number) {
    const prevPage = page - 1
    return prevPage
  }

  nextPageNumber(page: number) {
    const nextPage = page + 1
    return nextPage
  }

  selectPage($event: any) {
    this.currentPage = parseInt($event.target.value)
  }

  getPageCount(list: SearchDataResult[]) {
    return Math.ceil(list.length / this.itemsPerPage)
  }

  selectItemsPerPage($event: any) {
    this.itemsPerPage = parseInt($event.target.value)
  }
  
}
