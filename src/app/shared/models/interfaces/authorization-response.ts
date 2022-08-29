import { UserInfo } from './user-info';

export interface AuthorizationResponse {
  jwt: string;
  user: UserInfo;
}
