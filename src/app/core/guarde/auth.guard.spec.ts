import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService') },
        { provide: Router, useValue: jasmine.createSpyObj('Router') }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is logged in', () => {
    (authService as any).isLoggedIn.and.returnValue(true);
    (authService as any).hasRole.and.returnValue(true);

    const mockRoute = { data: { role: 'User' } } as any;

    expect(guard.canActivate(mockRoute)).toBe(true);
  });

  it('should redirect to login when user is not logged in', () => {
    (authService as any).isLoggedIn.and.returnValue(false);

    const mockRoute = { data: {} } as any;

    guard.canActivate(mockRoute);

    expect((router as any).navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect to login when user does not have required role', () => {
    (authService as any).isLoggedIn.and.returnValue(true);
    (authService as any).hasRole.and.returnValue(false);

    const mockRoute = { data: { role: 'Admin' } } as any;

    guard.canActivate(mockRoute);

    expect((router as any).navigate).toHaveBeenCalledWith(['/login']);
  });
});
