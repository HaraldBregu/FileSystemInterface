import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ProductComponent } from './product/product.component';
import { ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ExplorerComponent } from './explorer/explorer.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';
import { dashboardReducer } from './store/reducers';
import { hydrationMetaReducer } from './store/metareducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { NavigationEffects } from './store/effects/navigation.effects';
import { CatalogEffects } from './store/effects/catalog.effects';
import { ProductEffects } from './store/effects/product.effects';
import { ProductDetailEffects } from './store/effects/product-detail.effects';
import { SearchEffects } from './store/effects/search.effects';
import { ProductAssociationEffects } from './store/effects/product-association.effects';
import { ModalSearchComponent } from 'src/app/shared/modals/modal-search/modal-search.component';

export const metaReducers: MetaReducer<any>[] = [
  hydrationMetaReducer
]

@NgModule({
  declarations: [
    DashboardComponent,
    ProductComponent,
    ExplorerComponent,
    ProductDetailComponent,
  ],
  imports: [
    StoreModule.forFeature("DASHBOARD_FEATURE", dashboardReducer, { metaReducers: metaReducers }),
    EffectsModule.forFeature([
      CatalogEffects,
      ProductEffects,
      ProductDetailEffects,
      ProductAssociationEffects,
      SearchEffects,
      NavigationEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    DashboardRoutingModule,
    ComponentsModule,
    CoreUIModule,
    ModalSearchComponent,
  ],
  exports: [
    DashboardComponent,
    ProductComponent,
    ExplorerComponent,
    ProductDetailComponent,
  ],
})
export class DashboardModule { }
