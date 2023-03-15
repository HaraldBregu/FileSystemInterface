import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CardcollectionComponent } from './cardcollection/cardcollection.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    BreadcrumbComponent,
    CardcollectionComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    BreadcrumbComponent,
    CardcollectionComponent
  ]
})
export class ComponentsModule { }
