import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: MainComponent,
    /*children: [
      {
        path:'home',
        component: HomeComponent,
        outlet: 'main-content',
      }
    ]*/
  },
  /* {
     path: '**',
     redirectTo: "/home/(main-content:home)"
   }*/
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
