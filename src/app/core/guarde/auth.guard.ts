import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRole = route.data['role'];

    if (expectedRole && !this.authService.hasRole(expectedRole)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}

// Export as function for functional guard usage
export const authGuard: CanActivateFn = (route, state) => {
  // Use inject function for proper dependency injection
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const expectedRole = route.data['role'];

  if (expectedRole && !authService.hasRole(expectedRole)) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};