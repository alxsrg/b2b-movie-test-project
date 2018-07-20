import {CoreModule} from './core/core.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './core/components/app/app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http';

// RX imports
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/retry';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
