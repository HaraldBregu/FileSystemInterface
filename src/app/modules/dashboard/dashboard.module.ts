import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ProductComponent } from './product/product.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ExplorerComponent } from './explorer/explorer.component';
import {
  DashboardEffects,
  hydrationMetaReducer,
  dashboardReducer,
  DASHBOARD_SELECTOR
} from 'src/app/store';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductComponent,
    ExplorerComponent,
    ProductDetailComponent,
  ],
  imports: [
    StoreModule.forFeature(
      DASHBOARD_SELECTOR,
      dashboardReducer, {
      metaReducers: [
        hydrationMetaReducer
      ]
    }),
    EffectsModule.forFeature([
      DashboardEffects
    ]),
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    DashboardRoutingModule,
    ComponentsModule,
    CoreUIModule,
  ],
  exports: [
    DashboardComponent,
    ProductComponent,
    ExplorerComponent,
    ProductDetailComponent,
  ],
})
export class DashboardModule { }
