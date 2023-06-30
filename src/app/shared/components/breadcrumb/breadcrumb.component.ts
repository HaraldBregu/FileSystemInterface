import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';
import { Observable } from 'rxjs';
import { NavigationItem } from '../../interfaces/navigation-item';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    CoreUIModule,
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() navigationList$: Observable<NavigationItem[]> = new Observable()
  @Input() childsCount$: Observable<number> = new Observable()
  @Input() loading: boolean = false
  @Input() hasSearchResults: boolean = false
  @Output() onGetCatalogs = new EventEmitter()
  @Output() onSelectProduct = new EventEmitter<NavigationItem>()
  @Output() onBackToSearchResult = new EventEmitter()

  constructor() { }

  getCatalogs() {
    this.onGetCatalogs.emit()
  }

  selectProduct(item: NavigationItem) {
    this.onSelectProduct.emit(item)
  }

  clickBackToSearchResult() {
    this.onBackToSearchResult.emit()
  }
  
}
