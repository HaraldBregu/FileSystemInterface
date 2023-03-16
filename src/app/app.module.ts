import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from './core/components/components.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { AuthorizationInterceptorProvider } from './core/interceptors/authorization.interceptor';
import { DashboardModule } from './components/dashboard/dashboard.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    DashboardModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthorizationInterceptorProvider,
  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
