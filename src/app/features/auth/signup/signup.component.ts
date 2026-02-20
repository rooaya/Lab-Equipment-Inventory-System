import { Component } from '@angular/core';
import { User } from '../../../core/models/user';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    const newUser: User = {
      id: 0,
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      status: 'Active',
      dateJoined: new Date(),
      role: 'User'
    };

    const success = this.authService.signup(newUser);

    if (!success) {
      this.error = 'Email already exists';
      return;
    }

    // After successful signup → go to login
    this.router.navigate(['/login']);
  }
}