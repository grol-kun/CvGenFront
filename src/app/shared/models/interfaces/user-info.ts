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
