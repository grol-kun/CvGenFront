import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { MyInfo } from 'src/app/shared/models/interfaces/my-info';
import { setToken, removeToken, setMyInfo } from '../actions/auth.actions';

export interface AuthState {
  token: string | null;
  info: MyInfo | null;
}

export const initialState: AuthState = {
  token: null,
  info: null,
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
  })),
  on(setMyInfo, (state, { info }) => ({
    ...state,
    info: { ...info },
  }))
);

export const featureSelector = createFeatureSelector<AuthState>('authData');
export const tokenSelector = createSelector(featureSelector, (state) => state.token);
export const infoSelector = createSelector(featureSelector, (state) => state.info);
