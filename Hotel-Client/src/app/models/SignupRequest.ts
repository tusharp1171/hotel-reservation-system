export class SignupRequest {
    username: string;
    email: string;
    role: string[];  // Changed from Set<string> to string[]
    password: string;
    mobile: string;
  
    constructor(
      username: string = '',
      email: string = '',
      role: string[] = ['USER'],  // Default role as an array
      password: string = '',
      mobile: string = ''
    ) {
      this.username = username;
      this.email = email;
      this.role = role;
      this.password = password;
      this.mobile = mobile;
    }
  }
  