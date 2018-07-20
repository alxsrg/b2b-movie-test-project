import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './components/home/home.component';
import {MovieEntryComponent} from './components/movie-entry/movie-entry.component';
import {AppConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {SharedModule} from '../shared/shared.module';
import {AppDetailsModalComponent} from './components/details-modal/details-modal.component';
import {MovieService} from '../shared/services/movie.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [
    MovieEntryComponent,
    HomeComponent,
    AppConfirmDialogComponent,
    AppDetailsModalComponent
  ],
  entryComponents: [
    AppConfirmDialogComponent,
    AppDetailsModalComponent
  ],
  providers: [
    MovieService
  ]
})
export class HomeModule {
}
