import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ProductComponent } from './product/product.component';
import { MetaReducer, StoreModule, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ExplorerComponent } from './explorer/explorer.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { NavigationEffects } from './store/effects/navigation.effect';
import { CatalogEffects } from './store/effects/catalog.effect';
import { ProductDetailEffects } from './store/effects/product-detail.effect';
import { SearchEffects } from './store/effects/search.effect';
import { ProductAssociationEffects } from './store/effects/product-association.effect';
import { ModalSearchComponent } from 'src/app/shared/modals/modal-search/modal-search.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListEffects } from './store/effects/product-list.effect';
import { DashboardState } from './store/states';
import { productReducer } from './store/reducers/entity.reducer';
import { productDetailReducer } from './store/reducers';
import { productAssociationReducer } from './store/reducers/product-association';
import { searchReducer } from './store/reducers/search';
import { ProductEffects } from './store/effects/entity.effect';
import { VariantEffects } from './store/effects';

export const metaReducers: MetaReducer<any>[] = [
  //hydrationMetaReducer
]

export const rootReducer = combineReducers<DashboardState>({
  productState: productReducer,
  productDetailState: productDetailReducer,
  productAssociationState: productAssociationReducer,
  searchDataState: searchReducer,
})

@NgModule({
  declarations: [
    DashboardComponent,
    ProductComponent,
    ExplorerComponent,
    ProductDetailComponent,
    ProductListComponent,
  ],
  imports: [
    StoreModule.forFeature(
      "DASHBOARD_FEATURE",
      rootReducer, {
      metaReducers: metaReducers
    }),
    EffectsModule.forFeature([
      CatalogEffects,
      ProductListEffects,
      ProductDetailEffects,
      ProductAssociationEffects,
      SearchEffects,
      NavigationEffects,
      ProductEffects,
      VariantEffects,
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
