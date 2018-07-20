import Utils from '../utils';

export class MovieModel {
  public propertyNames: { [key: string]: string; } = {};

  [key: string]: any;   // we can have other (non-described) fields in MovieModel

  public get posterImg() {
    return this.poster === 'N/A' ? '' : this.poster;
  }

  public static comparator(a, b) {
    return (a.timestamp < b.timestamp)
      ? -1 : ((a.timestamp > b.timestamp))
        ? 1 : 0;
  }

  constructor(public imdbid: string = '',
              public title: string = '',
              public year: string = '',
              public poster: string = '',
              public type: string = '',
              public timestamp: number = null) {
  }

  public getPropertyName(key: string) {
    return this.propertyNames[key];
  }

  public updateTimeStamp() {
    this.timestamp = Utils.getClientUnixTIme();
  }
}
