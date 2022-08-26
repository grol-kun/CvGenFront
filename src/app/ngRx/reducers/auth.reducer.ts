import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { setToken, removeToken } from '../actions/auth.actions';

export interface TokenState {
  token: string | null;
}

export const initialState: TokenState = {
  token: null,
};

export const tokenReducer = createReducer(
  initialState,
  on(setToken, (state, { token }) => ({
    ...state,
    token,
  })),
  on(removeToken, (state) => ({
    ...state,
    token: initialState.token,
  }))
);

export const featureSelector = createFeatureSelector<TokenState>('authData');
export const tokenSelector = createSelector(featureSelector, (state) => state.token);
