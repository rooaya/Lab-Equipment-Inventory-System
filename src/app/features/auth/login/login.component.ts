import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login(): void {
    // Use AuthService for authentication
    const success = this.authService.login(this.username, this.password);

    if (!success) {
      this.errorMessage = 'Invalid username or password';
      return;
    }

    // Get current user and navigate based on role
    const user = this.authService.getCurrentUser();
    
    if (user?.role === 'Admin') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}