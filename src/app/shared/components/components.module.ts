import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataListComponent } from './data-list/data-list.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DataFilterComponent } from './data-filter/data-filter.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DetailFormComponent } from './detail-form/detail-form.component';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';
import { StoreModule } from '@ngrx/store';
import { MAIN_SELECTOR, dashboardReducer, hydrationMetaReducer } from 'src/app/store';
import { SearchDataComponent } from './search-data/search-data.component';

@NgModule({
  declarations: [
  ],
  imports: [
    StoreModule.forFeature(
      MAIN_SELECTOR,
      dashboardReducer, {
        metaReducers: [hydrationMetaReducer]
      }
    ),
    NavbarComponent,
    CommonModule,
    DetailFormComponent,
    DataListComponent,
    DataGridComponent,
    DataFilterComponent,
    BreadcrumbComponent,
    SearchDataComponent,
    CoreUIModule
  ],
  exports: [
    NavbarComponent,
    DetailFormComponent,
    DataListComponent,
    DataGridComponent,
    DataFilterComponent,
    BreadcrumbComponent,
    SearchDataComponent,
  ]
})
export class ComponentsModule { }
