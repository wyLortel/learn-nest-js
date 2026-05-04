export type UserStatus = 'PENDING' | 'ACTIVE';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  signupVerifyToken: string;
  status: UserStatus;
  createdAt: Date;
}
