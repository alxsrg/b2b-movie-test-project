import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ],
  declarations: [],
  providers: [],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ]
})
export class SharedModule {
}
