import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderStatus$ = new BehaviorSubject<boolean>(true);

  start() {
    this.loaderStatus$.next(true);
  }

  stop() {
    this.loaderStatus$.next(false);
  }

  get loaderStatus() {
    return this.loaderStatus$.asObservable();
  }
}
