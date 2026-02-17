import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile = {
    fullName: 'roayaaa',
    email: 'roayaaa@example.com',
    role: 'Admin',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    imageUrl: '' as string | ArrayBuffer | null
  };

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.profile.imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  triggerFileInput(input: HTMLInputElement) {
    input.click();
  }

  saveProfile() {
    // Logic to save profile changes
    console.log('Profile saved:', this.profile);
  }

  updatePassword() {
    // Logic to update password
    if (this.profile.newPassword !== this.profile.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (!this.profile.currentPassword || !this.profile.newPassword) {
      alert('Please fill in all password fields!');
      return;
    }

    console.log('Password updated');
    // Clear password fields
    this.profile.currentPassword = '';
    this.profile.newPassword = '';
    this.profile.confirmPassword = '';
  }

  meetsRequirement(type: string): boolean {
    const password = this.profile.newPassword;
    
    switch(type) {
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
