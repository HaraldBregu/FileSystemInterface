import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { PartnerDetailComponent } from './partner-detail/partner-detail.component';
import { RolesRegistryComponent } from './roles-registry/roles-registry.component';
import { PartnerOperationsComponent } from './partner-operations/partner-operations.component';
import { PartnerRoleOperationComponent } from './partner-role-operation/partner-role-operation.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'management', pathMatch: 'full' },
  {
    path: '',
    component: ManagementComponent,
    children: [
      //{ path: '', redirectTo: 'partner-detail', pathMatch: 'full' },
      {
        path: 'partner-detail',
        component: PartnerDetailComponent,
        outlet: 'content'
      },
      {
        path: 'roles-registry',
        component: RolesRegistryComponent,
        outlet: 'content'
      },
      {
        path: 'role-operation',
        component: PartnerRoleOperationComponent,
        outlet: 'content'
      },
      {
        path: 'partner-operations',
        component: PartnerOperationsComponent,
        outlet: 'content'
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
