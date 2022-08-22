export interface UserInfo {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  skills: string[];
  languages: string[];
  education: string;
  description: string;
  firstName: string;
  lastName: string;
  cvs: string[];
}

/* export interface UserInfo {
  id?: number | undefined;
  username?: string | undefined;
  email?: string | undefined;
  provider?: string | undefined;
  confirmed?: boolean | undefined;
  blocked?: boolean | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  skills?: string[] | undefined;
  languages?: string[] | undefined;
  education?: string | undefined;
  description?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  cvs?: string[] | undefined;
} */
