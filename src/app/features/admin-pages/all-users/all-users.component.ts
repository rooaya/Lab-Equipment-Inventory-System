import { Component } from '@angular/core';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-all-users',
  standalone: false,
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {

  searchTerm='';
  users: User[] = [];

  get filteredUsers(): User[] {
    if (!this.searchTerm) return this.users;
    return this.users.filter(user =>
      user.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

}
}
