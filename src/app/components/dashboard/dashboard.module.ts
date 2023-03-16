import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/core/components/components.module';


@NgModule({
  declarations: [
    SidebarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ComponentsModule
  ],
  exports: [
    SidebarComponent,
    DashboardComponent
  ]
})
export class DashboardModule { }
