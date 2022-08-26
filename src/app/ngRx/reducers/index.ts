import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { tokenReducer, TokenState } from './auth.reducer';

export interface State {
  authData: TokenState;
}

export const reducers: ActionReducerMap<State> = {
  authData: tokenReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
