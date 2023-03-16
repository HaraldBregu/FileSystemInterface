import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CardcollectionComponent } from './cardcollection/cardcollection.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListcollectionComponent } from './listcollection/listcollection.component';
import { DatafilterComponent } from './datafilter/datafilter.component';


@NgModule({
  declarations: [
    BreadcrumbComponent,
    CardcollectionComponent,
    ListcollectionComponent,
    DatafilterComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    BreadcrumbComponent,
    CardcollectionComponent,
    ListcollectionComponent,
    DatafilterComponent
  ]
})
export class ComponentsModule { }
