import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociationData } from '../../interfaces/product-association';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';

@Component({
  selector: 'app-association-data-table',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    CoreUIModule,
  ],
  templateUrl: './association-data-table.component.html',
  styleUrls: ['./association-data-table.component.scss']
})
export class AssociationDataTableComponent implements OnInit, OnChanges {
  @ViewChild('searchInput') searchInput: ElementRef = new ElementRef('')
  @Input() disable: boolean = false
  @Input() title?: string
  @Input() dataList?: AssociationData[]
  @Input() columns?: string[]
  @Output() onDataListChanges = new EventEmitter<AssociationData[]>()
  @Output() onAddClicked = new EventEmitter()

  dataListFiltered?: AssociationData[]
  currentPage = 1
  pageCount = 0
  dataListLength = 0
  itemsPerPage = 10
  itemsPerPageList = [10, 20, 30]
  showItemsPerPage = false

  constructor() {

  }

  ngOnInit(): void {
    this.showItemsPerPage = false
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataListLength = this.dataList?.length ?? 0
    this.pageCount = Math.ceil(this.dataListLength / this.itemsPerPage)
  }

  filterData($event: any) {
    const inputValue = $event.target.value

    this.dataListFiltered = this.dataList?.filter(content =>
      content.displayname.toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0, 15)

    if (inputValue.length === 0) {
      this.dataListFiltered = undefined
    }
  }

  removeItem(data: AssociationData) {
    this.dataList = this.removeDataFromList(data, this.dataList)
    this.dataListFiltered = this.removeDataFromList(data, this.dataListFiltered)
    this.onDataListChanges.emit(this.dataList)
  }

  cancelRemovedItem(data: AssociationData) {
    this.dataList = this.cancelRemovedDataFromList(data, this.dataList)
    this.dataListFiltered = this.cancelRemovedDataFromList(data, this.dataListFiltered)
    this.onDataListChanges.emit(this.dataList)
  }

  clearFilteredData() {
    this.searchInput.nativeElement.value = ''
    this.dataListFiltered = undefined
  }

  prevPage() {
    return (this.currentPage === 1) ? 1 : --this.currentPage
  }

  nextPage() {
    return (this.currentPage === this.pageCount) ? this.pageCount : ++this.currentPage
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

  removeDataFromList(data: AssociationData, datalist: AssociationData[] | undefined) {
    if (!datalist) return

    var tmpChildCategories = [...datalist]

    if (data.status === 'N') {

      const index = tmpChildCategories.indexOf(data);

      if (index !== -1) {
        tmpChildCategories.splice(index, 1);
      }
    } else {
      let indexToUpdate = tmpChildCategories.findIndex(item =>
        item.oid === data.oid &&
        item.childoid === data.childoid &&
        item.code === data.code);
      tmpChildCategories[indexToUpdate] = { ...data, status: "D" }
    }

    return tmpChildCategories.slice().sort((a, b) => b.status.localeCompare(a.status))
  }

  cancelRemovedDataFromList(data: AssociationData, datalist: AssociationData[] | undefined) {
    if (!datalist) return

    var tmpChildCategories = [...datalist]
    let indexToUpdate = tmpChildCategories.findIndex(item =>
      item.oid === data.oid &&
      item.childoid === data.childoid &&
      item.code === data.code);

    tmpChildCategories[indexToUpdate] = { ...data, status: "" }

    return tmpChildCategories.slice().sort((a, b) => b.status.localeCompare(a.status))
  }

  searchAndAddNewProduct() {
    this.onAddClicked.emit()
  }

}
