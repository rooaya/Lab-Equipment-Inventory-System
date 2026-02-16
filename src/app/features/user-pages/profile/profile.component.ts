import { Component } from '@angular/core';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class UserProfileComponent {
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
    this.editing = false;
    this.openInfoDialog('Profile Updated', 'Profile updated (local only).');
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
    if (this.currentPassword.length === 0) {
      this.openInfoDialog('Update Password', 'Please enter your current password.');
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

    this.user.password = this.newPassword;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
    this.openInfoDialog('Password Updated', 'Password updated (local only).');
  }

  logout(): void {
    this.openConfirmDialog('Logout', 'Are you sure you want to logout?', () => {
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
