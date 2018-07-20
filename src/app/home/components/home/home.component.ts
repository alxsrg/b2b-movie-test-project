import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MovieModel} from '../../../shared/models/movie.model';
import {debounceTime, filter, finalize, map, switchMap, tap} from 'rxjs/operators';
import {MovieService} from '../../../shared/services/movie.service';
import {AppConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  public movieList: MovieModel[];
  public searchCtrl = new FormControl();
  public filteredEntries: MovieModel[];
  public isLoading = false;
  public selectedMovie: MovieModel = null;

  constructor(private _omdService: MovieService,
              private _dialog: MatDialog) {
  }

  movieSelectDisplayFn(movie?: MovieModel): string | undefined {
    return movie ? movie.title : undefined;
  }

  ngOnInit() {
    this.searchCtrl.setValidators([
      Validators.minLength(3)
    ]);

    this.searchCtrl.markAsTouched();
    this.searchCtrl.markAsDirty();

    this.searchCtrl.valueChanges
      .pipe(
        debounceTime(300),
        filter(value => !!value),
        tap(() => this.isLoading = true),
        map(value => typeof value === 'string' ? value : value.title),
        switchMap(value => this._omdService.search(value)
          .pipe(
            finalize(() => this.isLoading = false)
          )
        )
      )
      .subscribe((entries: MovieModel[]) => this.filteredEntries = entries, _ => false);

    this.updateMovieList();
  }

  public updateMovieList() {
    this._omdService.getListFromStorage()
      .subscribe((entries: MovieModel[]) => {
        this.movieList = entries;
      });
  }

  public addSelectedMovie() {
    if (!this.selectedMovie || typeof this.selectedMovie !== 'object') {
      return;
    }

    if (this.movieList.findIndex(_movie => _movie.imdbid === this.selectedMovie.imdbid) !== -1) {
      this._dialog.open(AppConfirmDialogComponent, {
        height: '200px',
        width: '400px',
        data: {
          title: 'Oops!',
          message: `This movie already in the list.`,
          isConfirm: false
        }
      });

      return;
    }

    this.selectedMovie.updateTimeStamp();

    this._omdService
      .saveToStorage(this.selectedMovie)
      .subscribe(() => {
        this.updateMovieList();
        this.selectedMovie = null;
      });
  }

  public deleteMovieEntry(movie) {
    this._omdService
      .deleteFromStorage(movie)
      .subscribe(this.updateMovieList.bind(this));
  }
}
