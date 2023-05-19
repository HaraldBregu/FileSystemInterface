import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';
import { StoreModule } from '@ngrx/store';
import { DashboardEffects, MAIN_SELECTOR, dashboardReducer } from 'src/app/store';
import { EffectsModule } from '@ngrx/effects';
import { ModalEnvironmentsComponent } from 'src/app/shared/modals/modal-environments/modal-environments.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';


@NgModule({
  declarations: [
    MainComponent,
    LandingComponent,
    HomeComponent
  ],
  imports: [
    StoreModule.forFeature(
      MAIN_SELECTOR,
      dashboardReducer, {}
    ),
    EffectsModule.forFeature([
      DashboardEffects
    ]),
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    MainRoutingModule,
    NavbarComponent,
    CoreUIModule,
    ModalEnvironmentsComponent,
  ],
  exports: [
    MainComponent,
    LandingComponent,
    HomeComponent
  ]
})
export class MainModule { }
