import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.scss']
})
export class DataFilterComponent {
  @Output() onItemSelected = new EventEmitter();

  onClickListIcon() {
    this.onItemSelected.emit();
  }
}
