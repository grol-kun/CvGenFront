import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { setMyInfo, updateMyInfo } from '../actions/auth.actions';

@Injectable()
export class AppEffects {
  loadMyInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMyInfo),
      mergeMap(() =>
        this.authService.getMyInfo().pipe(
          map((info) => setMyInfo({ info })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
