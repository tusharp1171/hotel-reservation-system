import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';



@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any, private http: HttpClient) { }

  /** Checks if the code is running in the browser */
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /** Stores token in sessionStorage (only in the browser) */
  setToken(token: string): void {
    if (this.isBrowser() && token) {
      sessionStorage.setItem('token', token);
    }
  }

  /** Retrieves token from sessionStorage */
  getToken(): string | null {
    return this.isBrowser() ? sessionStorage.getItem('token') : null;
  }

  /** Retrieves username from the token */
  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = this.decodeToken(token);
      //console.log(payload);
      

      // console.log(payload?.sub);

      return payload?.sub || null; // "sub" contains the username
    } catch (error) {
      console.error('Error retrieving username:', error);
      return null;
    }
  }


  getUserId(): Promise<number | null> {

    console.log("called");
    
    const username = this.getUsername();
    // console.log("Extracted username:", username); // Debugging
  
    if (!username) {
      console.error("Username is null or undefined");
      return Promise.resolve(null);
    }
  
    return this.http.get<{ id: number }>(`http://localhost:8080/api/auth/${username}`).toPromise()
      .then(response => {
        if (!response || response.id === undefined) {
          console.warn("User not found or invalid response");
          return null;
        }
      //  console.log("Fetched user ID:", response.id);
        return response.id;
      })
      .catch(error => {
        console.error("Error fetching user ID:", error);
        return null;
      });
  }
  
  

  /** Retrieves user role from the token */
  getUserRole(): string | null {
    const token = this.getToken();
    // console.log(token);

    if (!token) return null;

    try {
      const payload = this.decodeToken(token);
      // console.log(payload);
      
      return payload?.roles?.[0] || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /** Checks if the token is expired */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      console.warn('No token found. Logging out...');
      return true;
    }

    try {
      const payload = this.decodeToken(token);
      if (!payload || !payload.exp) {
        console.error('Invalid token payload. Logging out...');
        return true;
      }

      const expiryTime = payload.exp * 1000; // Convert seconds to milliseconds
      const currentTime = Date.now();
      const timeRemaining = expiryTime - currentTime;

      // console.log(`Current Time: ${new Date(currentTime).toLocaleString()}`);
      // console.log(`Token Expiry: ${new Date(expiryTime).toLocaleString()}`);
      // console.log(`Time Remaining: ${timeRemaining / 1000} seconds`);

      return currentTime > expiryTime;
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true;
    }
  }


  /** Removes token and user role from sessionStorage */
  logout(): void {
    if (this.isBrowser()) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userRole');
      this.router.navigate(['/login']); // Redirect to login page after logout
    }
  }

  /** Automatically logs out the user when the token expires */
  autoLogout(): void {
    const token = this.getToken();
    if (!token) return;

    try {
      const payload = this.decodeToken(token);
      if (!payload || !payload.exp) {
        console.error('Invalid token payload. Logging out...');
        this.logout();
        return;
      }

      const expiryTime = payload.exp * 1000;
      const timeRemaining = expiryTime - Date.now();

      if (timeRemaining > 0) {
        // console.log(`Auto logout scheduled in ${timeRemaining / 1000} seconds`);
        setTimeout(() => {
          this.logout();
          alert('Session expired. Please log in again.');
        }, timeRemaining);
      } else {
        console.warn('Token already expired. Logging out...');
        this.logout();
      }
    } catch (error) {
      console.error('Error setting auto logout:', error);
      this.logout();
    }
  }


  /** Decodes JWT token */
  private decodeToken(token: string): any {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // console.log(payload);

      return payload;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }
}