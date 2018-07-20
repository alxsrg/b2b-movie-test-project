import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

interface IDialogParams {
  title: string;
  message: string;
  isConfirm: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: 'confirm-dialog.component.html'
})
export class AppConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogParams) {
  }
}
