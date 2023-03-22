import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataListComponent } from './data-list/data-list.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DataFilterComponent } from './data-filter/data-filter.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DetailFormComponent } from './detail-form/detail-form.component';

@NgModule({
  declarations: [
    NavbarComponent,
    BreadcrumbComponent,
    DataListComponent,
    DataGridComponent,
    DataFilterComponent,
    DetailFormComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    NavbarComponent,
    BreadcrumbComponent,
    DataListComponent,
    DataGridComponent,
    DataFilterComponent,
    DetailFormComponent,
  ]
})
export class ComponentsModule { }
