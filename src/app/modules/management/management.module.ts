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
import { OperationsEffects, OrganizationEffects, PartnerEffects, RoleEffects } from './store/effects';
import { operationReducer, organizationReducer, partnerReducer, partnerRoleReducer } from './store/reducers';
import { ManagementState } from './store/states';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesRegistryComponent } from './roles-registry/roles-registry.component';
import { PartnerOperationsComponent } from './partner-operations/partner-operations.component';
import { ConfirmDeleteAlertComponent } from 'src/app/shared/alerts/confirm-delete-alert/confirm-delete-alert.component';
import { PartnerRoleOperationComponent } from './partner-role-operation/partner-role-operation.component';
import { RoleOperationsEffects } from './store/effects/role-operation';
import { roleOperationReducer } from './store/reducers/role-operation';

export const metaReducers: MetaReducer<any>[] = [
  //hydrationMetaReducer
]

export const rootReducer = combineReducers<ManagementState>({
  partnerState: partnerReducer,
  partnerRoleState: partnerRoleReducer,
  organizationState: organizationReducer,
  operationState: operationReducer,
  roleOperationState: roleOperationReducer,
})

@NgModule({
  declarations: [
    ManagementComponent,
    PartnerDetailComponent,
    RolesRegistryComponent,
    PartnerOperationsComponent,
    PartnerRoleOperationComponent,
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
      OperationsEffects,
      RoleOperationsEffects,
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
    ConfirmDeleteAlertComponent,
  ],
  exports: [
    ManagementComponent,
    PartnerDetailComponent,
    RolesRegistryComponent,
    PartnerOperationsComponent,
    PartnerRoleOperationComponent,
  ]
})
export class ManagementModule { }
