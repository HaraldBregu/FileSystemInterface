import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ProductComponent } from './product/product.component';
import { StoreModule } from '@ngrx/store';
import { menuReducer} from './store/reducers'
import { DASHBOARD_SELECTOR } from './store/selectors/menu.selectors';
import { EffectsModule } from '@ngrx/effects';
import { MenuEffects } from './store/effects';

@NgModule({
  declarations: [
    SidebarComponent,
    DashboardComponent,
    ProductComponent
  ],
  imports: [
    StoreModule.forFeature(DASHBOARD_SELECTOR, menuReducer),
    EffectsModule.forFeature([MenuEffects]),
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
