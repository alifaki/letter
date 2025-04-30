export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser extends User {
  token?: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}
