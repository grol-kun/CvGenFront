import { Token } from '@angular/compiler';
import { createReducer, on } from '@ngrx/store';
import { setToken, removeToken } from '../actions/auth.actions';

export interface TokenState {
  token: string | null;
}

export const initialState: TokenState = {
  token: null,
};

export const tokenReducer = createReducer(
  initialState
  /*   on(setToken, (data) => data),
  on(removeToken, () => initialState) */
);
