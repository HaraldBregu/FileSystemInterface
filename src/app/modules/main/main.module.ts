import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';
import { ModalEnvironmentsComponent } from 'src/app/shared/modals/modal-environments/modal-environments.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { mainFeature } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from './store/effects';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent
  ],
  imports: [
    StoreModule.forFeature(mainFeature),
    EffectsModule.forFeature([MainEffects]),
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
    HomeComponent
  ]
})
export class MainModule { }
