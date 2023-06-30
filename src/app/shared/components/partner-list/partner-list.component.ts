import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Partner } from '../../interfaces/partner';
import { PartnerRole } from '../../interfaces/partner-role';

@Component({
  selector: 'app-partner-list',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ], templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnChanges {
  @Input() partners?: Partner[]
  @Input() selectedPartner?: Partner
  @Input() roles?: PartnerRole[]
  @Input() loading: boolean = false

  @Output() onSelectPartner = new EventEmitter<Partner>();
  @Output() onDeletePartner = new EventEmitter<Partner>();
  @Output() onLoadRoles = new EventEmitter<PartnerRole[]>();
  @Output() onSelectRole = new EventEmitter<PartnerRole>();
  @Output() onReload = new EventEmitter();
  @ViewChild('searchInput') searchInput: ElementRef = new ElementRef('')

  filteredPartners?: Partner[]
  selectedRole?: PartnerRole

  constructor() { }

  ngOnInit(): void {
    //this.filteredPartners = this.partners
  }

  ngOnChanges(changes: SimpleChanges): void {
    const props = changes['partners']
  
    if (props?.currentValue !== props?.previousValue) {
      this.filteredPartners = this.partners
    }

    if (props?.firstChange) {
    }

  }

  selectItem(item: Partner) {
    this.clearFilteredData()
    this.onSelectPartner.emit(item)
  }

  deleteItem(item: Partner) {
    this.clearFilteredData()
    this.onDeletePartner.emit(item)
  }

  loadRoles($event: any) {
    this.onLoadRoles.emit()
  }

  selectRole($event: any) {
    const roles = this.roles ?? []
    const value = $event.target.value
    if (value === 'NOVALUE000') {
      this.selectedRole = undefined
      this.onSelectRole.emit(undefined)
      return
    }
    const indexToSelect = roles.findIndex(item => item.partner_role_id === value)
    this.selectedRole = roles[indexToSelect]
    this.onSelectRole.emit(this.selectedRole)
  }

  filterData($event: any) {
    const inputValue = $event.target.value
    this.filteredPartners = this.partners?.filter(data => data.user_name?.toLowerCase().includes(inputValue.toLowerCase()))
  }

  clearFilteredData() {
    this.searchInput.nativeElement.value = ''
    this.filteredPartners = this.partners
  }

  reload(){
    this.onReload.emit()
  }
}
