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




}
