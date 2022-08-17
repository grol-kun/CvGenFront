import { User } from "../user";

export interface AuthorizationResponse {
  "jwt": string,
  "user": User
}
