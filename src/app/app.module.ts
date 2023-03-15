import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from './core/components/components.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http'
import { AuthorizationInterceptorProvider } from './core/interceptors/authorization.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent  
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
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
