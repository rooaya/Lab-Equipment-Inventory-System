import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [];

  private staticAdmin: User = {
    id: 0,
    fullName: 'Administrator',
    email: 'Admin101@gmail.com',
    password: 'Admin1234',
    status: 'Active',
    dateJoined: new Date(),
    role: 'Admin'
  };

  constructor(private router: Router) {
    const savedUsers = localStorage.getItem('users');
    this.users = savedUsers ? JSON.parse(savedUsers) : [];
  }

  signup(user: User): boolean {

    const existingUser = this.users.find(u => u.email === user.email);
    if (existingUser) {
      return false;
    }

    user.id = this.users.length + 2;
    user.role = 'User';
    user.status = 'Active';
    user.dateJoined = new Date();

    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));

    return true;
  }

  login(email: string, password: string): boolean {

    // Admin Login
    if (email === this.staticAdmin.email &&
      password === this.staticAdmin.password) {

      localStorage.setItem('currentUser', JSON.stringify(this.staticAdmin));
      return true;
    }

    // User Login
    const user = this.users.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  hasRole(role: 'Admin' | 'User'): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Update current user data in local storage
  updateUser(updates: Partial<User>): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };

      // Update currentUser in local storage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Also update the user in the users array if it's a regular user
      if (currentUser.role === 'User') {
        const userIndex = this.users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
          this.users[userIndex] = updatedUser;
          localStorage.setItem('users', JSON.stringify(this.users));
        }
      }
    }
  }
}