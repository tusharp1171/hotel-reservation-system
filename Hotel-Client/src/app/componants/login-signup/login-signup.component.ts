import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../../models/LoginRequest';
import { SignupRequest } from '../../models/SignupRequest';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login-signup',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent implements OnInit{

  
  isLoginMode = true;
  loginForm: FormGroup;
  signupForm: FormGroup;
  role: string = 'USER';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {



    
    // Check if user is already logged in
    const token = this.tokenService.getToken();
    if (token && !this.tokenService.isTokenExpired()) {
      this.redirectUser();
    }
    // Initialize Login Form
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    // Initialize Signup Form
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['role']) {
        this.role = params['role'];  // If passed from Book Now, it will be 'CUSTOMER'
      }
    });
    console.log(this.tokenService.getUserId());
    console.log("called");

    console.log(this.role);
    
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  redirectUser() {
    const role = this.tokenService.getUserRole();
    if (role === 'ROLE_ADMIN') {
      this.router.navigate(['/admin']);
    } else if(role=== 'ROLE_USER') {
      this.router.navigate(['/user']);
    }
    else if(role=== 'ROLE_CUSTOMER'){
      this.router.navigate(['/home']);
    }
   
  }
  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          if (response && response.accessToken) {
            this.tokenService.setToken(response.accessToken);
            this.tokenService.autoLogout(); // Start auto logout timer
            alert('Login Successful!');
            this.redirectUser();
          } else {
            alert('Login failed: Invalid token received.');
          }
        },
        (error) => {
          alert('Login Failed: ' + (error.error?.message || 'Server error'));
        }
      );
    }
  }
  onSignup() {
    if (this.signupForm.valid) {
      this.authService.singUp(this.signupForm.value).subscribe(
        () => {
          alert('Signup Successful! Please login.');
          this.toggleMode();
        },
        (error) => {
          alert('Signup Failed: ' + (error.error?.message || 'Server error'));
        }
      );
    }
  }

  
}