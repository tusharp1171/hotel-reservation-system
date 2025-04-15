import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';
import { Observable } from 'rxjs';
import { SignupRequest } from '../models/SignupRequest';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient,
    private tokenservice:TokenService,
    
  ) {}

  login(login: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/signin`, login);
  }

  singUp(signup:SignupRequest):Observable<any>{
    return this.http.post<SignupRequest>(`${this.API}/signup`,signup)
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return token !== null && !this.tokenservice.isTokenExpired();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
