import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MovieService} from '../../../shared/services/movie.service';
import {MovieModel} from '../../../shared/models/movie.model';

@Component({
  selector: 'app-details-modal',
  templateUrl: 'details-modal.component.html',
})
export class AppDetailsModalComponent implements OnInit {
  public movieDataPairs: [string, string][];
  public model: MovieModel;
  private _imdbId;

  constructor(private _movieService: MovieService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this._imdbId = data.id;
  }

  public ngOnInit() {
    const filterKeys = ['propertyNames', 'timestamp', 'imdbid', 'poster', 'title', 'year'];
    this._movieService.getByImdbId(this._imdbId).subscribe(movie => {
      this.model = movie;
      this.movieDataPairs = Object.entries(movie)
        .filter(([key, value]) => !filterKeys.includes(key))
        .filter(([key, value]) => typeof value === 'string' ? value.trim().length : true);
    });
  }
}
