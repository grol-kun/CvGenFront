import { createAction, props } from '@ngrx/store';

export const setToken = createAction('[AUTH] setToken', props<{ token: string }>());
export const getToken = createAction('[AUTH] getToken');
export const removeToken = createAction('[AUTH] removeToken');
