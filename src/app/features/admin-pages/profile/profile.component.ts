import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: User = {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    status: 'Active',
    dateJoined: new Date(),
    role: 'Admin'
  };

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  imageUrl = '' as string | ArrayBuffer | null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadProfileData();
  }

  private loadProfileData(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.profile = currentUser;
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  saveProfile(): void {
    // Update profile data in local storage
    this.authService.updateUser({
      fullName: this.profile.fullName,
      email: this.profile.email,
      status: this.profile.status
    });

    console.log('Profile saved:', this.profile);
  }

  updatePassword(): void {
    // Validate password fields
    if (this.currentPassword.length === 0 || this.newPassword.length === 0) {
      alert('Please fill in all password fields!');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    // Validate password requirements
    if (!this.meetsRequirement('length') || !this.meetsRequirement('case') || !this.meetsRequirement('number')) {
      alert('Password must be at least 8 characters with uppercase, lowercase, and numbers!');
      return;
    }

    // Get current user to validate current password
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && this.currentPassword !== currentUser.password) {
      alert('Current password is incorrect!');
      return;
    }

    // Update password in local storage
    this.authService.updateUser({ password: this.newPassword });
    this.profile.password = this.newPassword;

    console.log('Password updated');

    // Clear password fields
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';

    alert('Password updated successfully!');
  }

  logout(): void {
    this.authService.logout();
  }

  meetsRequirement(type: string): boolean {
    const password = this.newPassword;

    switch (type) {
      case 'length':
        return password.length >= 8;
      case 'case':
        return /[a-z]/.test(password) && /[A-Z]/.test(password);
      case 'number':
        return /\d/.test(password);
      default:
        return false;
    }
  }
}
