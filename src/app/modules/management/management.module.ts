import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PartnerDetailComponent } from './partner-detail/partner-detail.component';
import { MetaReducer, StoreModule, combineReducers } from '@ngrx/store';
import { hydrationMetaReducer } from './store/metareducers/metareducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrganizationEffects, PartnerEffects, RoleEffects } from './store/effects';
import { organizationReducer, partnerReducer, partnerRoleReducer } from './store/reducers';
import { ManagementState } from './store/states';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalOrganisationsComponent } from 'src/app/shared/modals/modal-organisations/modal-organisations.component';
import { RolesRegistryComponent } from './roles-registry/roles-registry.component';

export const metaReducers: MetaReducer<any>[] = [
  hydrationMetaReducer
]

export const rootReducer = combineReducers<ManagementState>({
  partnerState: partnerReducer,
  partnerRoleState: partnerRoleReducer,
  organizationState: organizationReducer,
})

@NgModule({
  declarations: [
    ManagementComponent,
    PartnerDetailComponent,
    RolesRegistryComponent,
  ],
  imports: [
    StoreModule.forFeature(
      "MANAGEMENT_FEATURE",
      rootReducer, {
      metaReducers: metaReducers
    }),
    EffectsModule.forFeature([
      PartnerEffects,
      RoleEffects,
      OrganizationEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    CommonModule,
    ManagementRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ComponentsModule,
    ModalOrganisationsComponent,
  ],
  exports: [
    ManagementComponent,
    PartnerDetailComponent,
    RolesRegistryComponent,
  ]
})
export class ManagementModule { }
