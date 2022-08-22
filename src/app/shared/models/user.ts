export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  skills: any;
  languages: string | null;
  education: string | null;
  description: string | null;
  firstName: string | null;
  lastName: string | null;
  cvs: string | null;
}
