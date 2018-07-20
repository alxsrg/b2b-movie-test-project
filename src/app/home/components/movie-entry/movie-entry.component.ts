import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MovieModel} from '../../../shared/models/movie.model';
import {MatDialog} from '@angular/material';
import {AppConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {AppDetailsModalComponent} from '../details-modal/details-modal.component';
import {Overlay} from '@angular/cdk/overlay';

@Component({
  moduleId: module.id,
  selector: 'app-movie',
  templateUrl: 'movie-entry.component.html'
})
export class MovieEntryComponent implements OnChanges {
  @Input() model: MovieModel;
  @Output() onDelete: EventEmitter<MovieModel> = new EventEmitter<MovieModel>();
  @Output() onSave: EventEmitter<MovieModel> = new EventEmitter<MovieModel>();

  constructor(private _dialog: MatDialog, private _overlay: Overlay) {
  }

  ngOnChanges() {
  }

  public showDetails() {
    this._dialog.open(AppDetailsModalComponent, {
      height: '720px',
      width: '700px',
      autoFocus: false,
      data: {id: this.model.imdbid}
    });
  }

  public delete() {
    const confirmDialogRef = this._dialog.open(AppConfirmDialogComponent, {
      height: '200px',
      width: '400px',
      data: {
        title: 'Delete movie',
        message: `Are you sure you want to delete movie «${this.model.title}» from list?`,
        isConfirm: true
      }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete.emit(this.model);
      }
    });
  }
}
