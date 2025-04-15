  import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (state.url === '/' || state.url === '/home') {
    return true; // Allow access to home page without authentication
  }

  if (tokenService.isTokenExpired()) {
    console.log('Token expired. Logging out...');
    tokenService.logout();
    router.navigate(['/login']);
    return false;
  }

  tokenService.autoLogout();

  const role = tokenService.getUserRole();
  if (!role) {
    router.navigate(['/login']);
    return false;
  }

 


  if (role === 'ROLE_ADMIN' && !state.url.startsWith('/admin')) {
    console.log('Unauthorized admin access attempt. Redirecting...');
    router.navigate(['/admin']);
    return false;
  } else if (role === 'ROLE_USER' && !state.url.startsWith('/user')) {
    console.log('Unauthorized user access attempt. Redirecting...');
    router.navigate(['/user']);
    return false;
  } else if (role === 'ROLE_CUSTOMER' && !state.url.startsWith('/home')) {
    console.log('Unauthorized customer access attempt. Redirecting...');
    router.navigate(['/home']);
    return false;
  }

  return true;
};