import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const featureSelector = createFeatureSelector<AuthState>('authData');
export const tokenSelector = createSelector(featureSelector, (state) => state.token);
export const infoSelector = createSelector(featureSelector, (state) => state.info);
