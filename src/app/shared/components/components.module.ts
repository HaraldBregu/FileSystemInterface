import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';
import { SearchDataComponent } from './search-data/search-data.component';
import { PropFormComponent } from './prop-form/prop-form.component';
import { VariantsTableComponent } from './variants-table/variants-table.component';
import { AssociationDataComponent } from './association-data/association-data.component';
import { PartnerListComponent } from './partner-list/partner-list.component';

@NgModule({
  declarations: [
  ],
  imports: [
    NavbarComponent,
    CommonModule,
    PropFormComponent,
    VariantsTableComponent,
    AssociationDataComponent,
    PartnerListComponent,
    SearchDataComponent,
    CoreUIModule
  ],
  exports: [
    NavbarComponent,
    PropFormComponent,
    VariantsTableComponent,
    AssociationDataComponent,
    PartnerListComponent,
    SearchDataComponent,
  ]
})
export class ComponentsModule { }
