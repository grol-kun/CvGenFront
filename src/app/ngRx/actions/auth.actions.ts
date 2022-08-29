import { createAction, props } from '@ngrx/store';
import { MyInfo } from 'src/app/shared/models/interfaces/my-info';
import { AuthActions } from '../enums/auth-actions.enum';

export const setToken = createAction(AuthActions.SetToken, props<{ token: string }>());
export const getToken = createAction(AuthActions.GetToken);
export const removeToken = createAction(AuthActions.RemoveToken);

export const updateMyInfo = createAction(AuthActions.UpdateMyInfo);
export const setMyInfo = createAction(AuthActions.SetMyInfo, props<{ info: MyInfo }>());
