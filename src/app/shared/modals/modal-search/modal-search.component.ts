import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchDataComponent } from '../../components/search-data/search-data.component';

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

  open() {
    this.visible = true
  }

  close() {
    this.visible = false
  }

}
