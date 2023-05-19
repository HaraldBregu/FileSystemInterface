import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { DashboardComponent } from './dashboard.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path:'product',
        component: ProductComponent,
        outlet: 'dashboard-content'
      },
      {
        path: 'detail-product',
        component: ProductDetailComponent,
        outlet: 'dashboard-content'
      },
      {
        path: 'explorer',
        component: ExplorerComponent,
        outlet: 'dashboard-content'
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
