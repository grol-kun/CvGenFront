import { createAction } from '@ngrx/store';

export const setToken = createAction('[AUTH] setToken');
export const getToken = createAction('[AUTH] getToken');
export const removeToken = createAction('[AUTH] removeToken');
