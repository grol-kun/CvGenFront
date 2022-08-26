import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { tokenReducer, TokenState } from './auth.reducer';

export interface State {
  token: TokenState;
}

export const reducers: ActionReducerMap<State> = {
  token: tokenReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
