import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class UserProfileComponent implements OnInit {
  dialogOpen = false;
  dialogTitle = '';
  dialogMessage = '';
  dialogConfirmText = 'OK';
  dialogCancelText = 'Cancel';
  dialogShowCancel = false;
  private dialogOnConfirm: (() => void) | null = null;

  user: User = {
    id: 101,
    fullName: 'Regular User',
    email: 'user@example.com',
    password: '********',
    status: 'Active',
    dateJoined: new Date('2025-11-01'),
    role: 'User'
  };

  editing = false;

  form: Pick<User, 'fullName' | 'email' | 'status'> = {
    fullName: this.user.fullName,
    email: this.user.email,
    status: this.user.status
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    const savedUser = this.authService.getCurrentUser();
    if (savedUser) {
      this.user = savedUser;
      this.form = {
        fullName: savedUser.fullName,
        email: savedUser.email,
        status: savedUser.status
      };
    }
  }

  startEdit(): void {
    this.editing = true;
    this.form = {
      fullName: this.user.fullName,
      email: this.user.email,
      status: this.user.status
    };
  }

  cancelEdit(): void {
    this.editing = false;
  }

  save(): void {
    this.user.fullName = this.form.fullName;
    this.user.email = this.form.email;
    this.user.status = this.form.status;

    // Save updated user data to local storage
    this.authService.updateUser({
      fullName: this.user.fullName,
      email: this.user.email,
      status: this.user.status
    });

    this.editing = false;
    this.openInfoDialog('Profile Updated', 'Profile updated successfully.');
  }

  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';

  get passwordHasMinLength(): boolean {
    return this.newPassword.length >= 8;
  }

  get passwordHasUpperAndLower(): boolean {
    return /[a-z]/.test(this.newPassword) && /[A-Z]/.test(this.newPassword);
  }

  get passwordHasNumber(): boolean {
    return /\d/.test(this.newPassword);
  }

  get passwordMatches(): boolean {
    return this.newPassword.length > 0 && this.newPassword === this.confirmNewPassword;
  }

  updatePassword(): void {
    const currentUser = this.authService.getCurrentUser();

    if (this.currentPassword.length === 0) {
      this.openInfoDialog('Update Password', 'Please enter your current password.');
      return;
    }

    // Validate current password against stored password
    if (currentUser && this.currentPassword !== currentUser.password) {
      this.openInfoDialog('Update Password', 'Current password is incorrect.');
      return;
    }

    if (!this.passwordHasMinLength || !this.passwordHasUpperAndLower || !this.passwordHasNumber) {
      this.openInfoDialog('Update Password', 'New password does not meet the requirements.');
      return;
    }

    if (!this.passwordMatches) {
      this.openInfoDialog('Update Password', 'Confirm password does not match.');
      return;
    }

    // Update user password in memory and local storage
    this.user.password = this.newPassword;
    this.authService.updateUser({ password: this.newPassword });

    // Clear form fields
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';

    // Show success message and logout
    this.openInfoDialog('Password Updated', 'Password updated successfully. You will be logged out for security.');

    // Auto logout after 2 seconds for security
    setTimeout(() => {
      this.authService.logout();
    }, 2000);
  }

  logout(): void {
    this.openConfirmDialog('Logout', 'Are you sure you want to logout?', () => {
      this.authService.logout();
      this.openInfoDialog('Logout', 'Logging out...');
    });
  }

  closeDialog(): void {
    this.dialogOpen = false;
    this.dialogOnConfirm = null;
  }

  confirmDialog(): void {
    const cb = this.dialogOnConfirm;
    this.closeDialog();
    if (cb) {
      cb();
    }
  }

  cancelDialog(): void {
    this.closeDialog();
  }

  private openInfoDialog(title: string, message: string): void {
    this.dialogTitle = title;
    this.dialogMessage = message;
    this.dialogConfirmText = 'OK';
    this.dialogCancelText = 'Cancel';
    this.dialogShowCancel = false;
    this.dialogOnConfirm = null;
    this.dialogOpen = true;
  }

  private openConfirmDialog(title: string, message: string, onConfirm: () => void): void {
    this.dialogTitle = title;
    this.dialogMessage = message;
    this.dialogConfirmText = 'Confirm';
    this.dialogCancelText = 'Cancel';
    this.dialogShowCancel = true;
    this.dialogOnConfirm = onConfirm;
    this.dialogOpen = true;
  }
}
