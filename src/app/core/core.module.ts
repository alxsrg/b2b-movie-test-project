import {HeaderComponent} from './components/header/header.component';
import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './components/app/app.component';

export const COMPONENTS = [
  AppComponent,
  HeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule
    };
  }
}
