import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataListComponent } from './data-list/data-list.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DataFilterComponent } from './data-filter/data-filter.component';


@NgModule({
  declarations: [
    BreadcrumbComponent,
    DataListComponent,
    DataGridComponent,
    DataFilterComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    BreadcrumbComponent,
    DataListComponent,
    DataGridComponent,
    DataFilterComponent,
  ]
})
export class ComponentsModule { }
