import { Component } from '@angular/core';
import { User } from '../../../core/models/user';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-all-users',
  standalone: false,
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {

  searchTerm = '';
  statusFilter = '';
  roleFilter = '';
  showUserModal = false;
  editingUser: User | null = null;

  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }

  userForm = {
    fullName: '',
    email: '',
    role: 'User' as 'Admin' | 'User',
    status: 'Active' as string
  };

  users: User[] = [
    {
      id: 1,
      fullName: 'Roaya Youssef',
      email: 'roaya@example.com',
      password: '********',
      status: 'Active',
      dateJoined: new Date('2025-10-10'),
      role: 'Admin'
    },
    {
      id: 2,
      fullName: 'Omar Hassan',
      email: 'omar.hassan@example.com',
      password: '********',
      status: 'Pending',
      dateJoined: new Date('2025-12-05'),
      role: 'User'
    },
    {
      id: 3,
      fullName: 'Mariam Ali',
      email: 'mariam.ali@example.com',
      password: '********',
      status: 'Blocked',
      dateJoined: new Date('2024-06-21'),
      role: 'User'
    }
  ];

  get filteredUsers(): User[] {
    return this.users.filter(user => {
      const matchesSearch = !this.searchTerm ||
        user.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = !this.statusFilter || user.status === this.statusFilter;
      const matchesRole = !this.roleFilter || user.role === this.roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }

  getActiveUsersCount(): number {
    return this.users.filter(user => user.status === 'Active').length;
  }

  getPendingUsersCount(): number {
    return this.users.filter(user => user.status === 'Pending').length;
  }

  getBlockedUsersCount(): number {
    return this.users.filter(user => user.status === 'Blocked').length;
  }

  trackById(_: number, user: User): number {
    return user.id;
  }

  openAddUserModal(): void {
    this.editingUser = null;
    this.userForm = {
      fullName: '',
      email: '',
      role: 'Admin' as 'Admin' | 'User',
      status: 'Active'
    };
    this.showUserModal = true;
  }

  editUser(user: User): void {
    this.editingUser = user;
    this.userForm = {
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status
    };
    this.showUserModal = true;
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.fullName}?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
    }
  }

  closeUserModal(): void {
    this.showUserModal = false;
    this.editingUser = null;
    this.userForm = {
      fullName: '',
      email: '',
      role: 'User',
      status: 'Active'
    };
  }

  saveUser(): void {
    if (!this.userForm.fullName || !this.userForm.email) {
      alert('Please fill in all required fields!');
      return;
    }

    if (this.editingUser) {
      // Update existing user
      const index = this.users.findIndex(u => u.id === this.editingUser!.id);
      if (index !== -1) {
        this.users[index] = {
          ...this.users[index],
          fullName: this.userForm.fullName,
          email: this.userForm.email,
          role: this.userForm.role,
          status: this.userForm.status
        };
      }
    } else {
      // Add new user
      const newUser: User = {
        id: Math.max(...this.users.map(u => u.id)) + 1,
        fullName: this.userForm.fullName,
        email: this.userForm.email,
        password: '********',
        role: this.userForm.role,
        status: this.userForm.status,
        dateJoined: new Date()
      };
      this.users.push(newUser);
    }

    this.closeUserModal();
  }
}
