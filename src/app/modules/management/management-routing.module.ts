import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { PartnerDetailComponent } from './partner-detail/partner-detail.component';
import { RolesRegistryComponent } from './roles-registry/roles-registry.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      {
        path: 'partner-detail',
        component: PartnerDetailComponent,
        outlet: 'management-content'
      },
      {
        path: 'roles-registry',
        component: RolesRegistryComponent,
        outlet: 'management-content'
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
