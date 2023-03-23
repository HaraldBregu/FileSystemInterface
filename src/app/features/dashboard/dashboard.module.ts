import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BaseComponentsModule } from 'src/app/core/components/base-components.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ProductComponent } from './product/product.component';
import { StoreModule } from '@ngrx/store';
import { dashboardReducer } from './store/reducers'
import { DASHBOARD_SELECTOR } from './store/selectors/menu.selectors';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './store/effects';
import { metaReducers } from './store';
import { ExplorerComponent } from './explorer/explorer.component';


@NgModule({
  declarations: [
    SidebarComponent,
    DashboardComponent,
    ProductComponent,
    ExplorerComponent,
  ],
  imports: [
    StoreModule.forFeature(
      DASHBOARD_SELECTOR,
      dashboardReducer,
      { metaReducers }),
    EffectsModule.forFeature([
      DashboardEffects
    ]),
    CommonModule,
    FontAwesomeModule,
    BaseComponentsModule,
    ComponentsModule,
  ],
  exports: [
    SidebarComponent,
    DashboardComponent,
    ProductComponent,
    ExplorerComponent,
  ]
})
export class DashboardModule { }
