import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { tokenReducer, AuthState } from './auth.reducer';

export interface State {
  authData: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  authData: tokenReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
