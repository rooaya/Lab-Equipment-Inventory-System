import { Component } from '@angular/core';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-all-users',
  standalone: false,
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {

  searchTerm = '';
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
    if (!this.searchTerm) return this.users;
    return this.users.filter(user =>
      user.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

  }
}
