import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './shared/components/components.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { EffectsModule } from '@ngrx/effects';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { EnvironmentInterceptor } from './shared/interceptors/environment.interceptor';
import { AppEffects } from './store/effects';
import { appReducer } from './store/reducers';
import { hydrationMetaReducer } from './store/metareducers';
import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';


class CustomUrlSerializer extends DefaultUrlSerializer {
  private _reverseUrl(url: string): string {
    const startIndex = 1;
    const segmentString =
      `(${url.substring(startIndex).split('/').join('//')})`;
    return url.substring(0, startIndex) + segmentString;
  }
  private _beautifyUrl(url: string): string {
    return url
      .replace('(', '')
      .replace(')', '')
      .split('//').join('/');
  }

  override parse(url: string): UrlTree {
    return super.parse(this._reverseUrl(url));
  }

  override serialize(tree: UrlTree): string {
    return this._beautifyUrl(super.serialize(tree));
  }
}

export const metaReducers: MetaReducer<any>[] = [
  hydrationMetaReducer
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    StoreModule.forRoot({ "APP_FEATURE": appReducer }, { metaReducers }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    BrowserAnimationsModule,

  ],
  providers: [
    //{ provide: UrlSerializer, useClass: CustomUrlSerializer },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EnvironmentInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }

