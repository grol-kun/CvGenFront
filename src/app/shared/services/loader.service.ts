import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loaderStatus$ = new BehaviorSubject<boolean>(true);

  start() {
    this._loaderStatus$.next(true);
  }

  stop() {
    this._loaderStatus$.next(false);
  }

  get loaderStatus$() {
    return this._loaderStatus$.asObservable();
  }
}
