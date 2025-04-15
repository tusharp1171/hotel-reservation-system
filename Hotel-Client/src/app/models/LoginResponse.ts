export interface LoginResponse {
    accessToken: string;
    id: number;
    username: string;
    email: string;
    roles: string[];
    tokenType: string;
  }
  