import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ResourcesInterceptor } from './core/interceptors/resources.interceptor';
import { environment } from 'src/environments/environment.prod';


export function getBaseUrl() {
  return environment.baseUrl;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [
    { 
      provide: 'BASE_URL', 
      useFactory: getBaseUrl, 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResourcesInterceptor,
      multi: true,
      
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
