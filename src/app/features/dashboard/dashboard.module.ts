import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ProductComponent } from './product/product.component';
import { StoreModule } from '@ngrx/store';
import { menuReducer} from './store/reducers/menu.reducer'
import { MENU_STATE_ITEM } from './store/selectors/menu.selectors';

@NgModule({
  declarations: [
    SidebarComponent,
    DashboardComponent,
    ProductComponent
  ],
  imports: [
    //StoreModule.forRoot({cartEntries: menuReducer}),
    StoreModule.forFeature(MENU_STATE_ITEM, menuReducer),
    CommonModule,
    FontAwesomeModule,
    ComponentsModule,
  ],
  exports: [
    SidebarComponent,
    DashboardComponent,
    ProductComponent
  ]
})
export class DashboardModule { }
