import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {MovieModel} from '../models/movie.model';

/**
 * Service to interact with OMDB API & get access to Local Storage
 */

interface IStorageData {
  movies: MovieModel[];
}

@Injectable()
export class MovieService {

  static endpoint = 'http://www.omdbapi.com';
  static storageKey = 'b2b-movie-app';
  static apiKey = '39019ead';

  private static handleError(response: Response) {
    const json = response.json();
    const error = json['Error'];
    console.error(`MovieService.error: ${error ? error : 'unknown'}`);
    return Observable.create(observer =>
      observer.error(error)
    );
  }

  constructor(private http: Http) {
  }

  private static prepareQuery(query) {
    return encodeURI(query.replace(/ /ig, '+'));
  }

  private static _getStorage(): IStorageData {
    if (window.localStorage[MovieService.storageKey]) {
      const data = JSON.parse(window.localStorage[MovieService.storageKey]);
      const movies = data.movies;
      data.movies = movies.map(movie => Object.assign(new MovieModel(), movie));
      return data;
    }

    return MovieService._saveStorage({
      movies: []
    });
  }

  private static _saveStorage(storageObj: IStorageData): IStorageData {
    window.localStorage[MovieService.storageKey] = JSON.stringify(storageObj);
    return storageObj;
  }

  private static _prepareQueryString(queryParams: any) {
    return Object.entries(queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  public getByImdbId(imdbId: string): Observable<MovieModel> {
    const queryParams = {
      i: imdbId,
      plot: 'full',
      apikey: MovieService.apiKey
    };

    return this.http.get(`${MovieService.endpoint}/?${MovieService._prepareQueryString(queryParams)}`)
      .catch(MovieService.handleError)
      .map((data: Response) => {
        const json = data.json();
        const movie = new MovieModel();

        // convert all entry's keys to lowercase
        const jsonMovie = Object.keys(json)
          .reduce((acc: any, key: string) => {
            const lowercaseKey = key.toLocaleLowerCase();
            if (lowercaseKey !== 'response') {
              acc[lowercaseKey] = json[key];
              movie.propertyNames[lowercaseKey] = key;
            }
            return acc;
          }, {});

        return Object.assign(movie, jsonMovie) as MovieModel;
      });
  }

  public search(searchString: string): Observable<MovieModel[]> {
    if (!searchString || searchString.trim().length < 3) {
      return Observable.of(<MovieModel[]>[]);
    }

    const queryParams = {
      s: MovieService.prepareQuery(searchString),
      plot: 'full',
      apikey: MovieService.apiKey,
      page: 1
    };

    return this.http.get(`${MovieService.endpoint}/?${MovieService._prepareQueryString(queryParams)}`)
      .catch(MovieService.handleError)
      .map((data: Response) => {
        const results = data.json();

        const jsonEntries = results['Search'];

        return jsonEntries ? (jsonEntries
          .filter((jsonEntry: MovieModel) => jsonEntry !== null)
          .map((jsonEntry: MovieModel) => {

            // convert all entry's keys to lowercase
            const jsonEntryModified = Object.keys(jsonEntry)
              .reduce((acc: any, key: string) => {
                acc[key.toLocaleLowerCase()] = jsonEntry[key];
                return acc;
              }, {});

            // assign data with model
            return Object.assign(new MovieModel(), jsonEntryModified);
          })) : [];
      });
  }

  public getListFromStorage(): Observable<MovieModel[]> {
    const storageObj = MovieService._getStorage();
    storageObj.movies.sort(MovieModel.comparator).reverse();
    return Observable.of(storageObj.movies);
  }

  public saveToStorage(movie: MovieModel): Observable<MovieModel> {
    const storageObj = MovieService._getStorage();
    storageObj.movies.push(movie);
    MovieService._saveStorage(storageObj);
    return Observable.of(movie);
  }

  public deleteFromStorage(movie: MovieModel): Observable<MovieModel> {
    const storageObj = MovieService._getStorage();
    const movies = storageObj.movies;
    storageObj.movies = movies.filter(_movie => _movie.imdbid !== movie.imdbid);
    MovieService._saveStorage(storageObj);
    return Observable.of(movie);
  }
}
