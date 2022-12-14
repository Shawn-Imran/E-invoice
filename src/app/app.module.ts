import {BrowserModule, Meta, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OverlayContainer} from '@angular/cdk/overlay';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {FacebookModule} from 'ngx-facebook';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    HttpClientModule,
    // Angular Firebase Config
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // Ngx Facebook
    FacebookModule.forRoot()
  ],
  providers: [
    Title,
    Meta,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
