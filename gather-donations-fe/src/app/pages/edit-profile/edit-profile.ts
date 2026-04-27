import { Component, Input, inject, computed, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  imports: [RouterLink, FormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private auth = inject(AuthService);

  imageFile: File | null = null;
  imagePreviewUrl: string | null = null;

  email = '';
  username = '';
  firstName = '';
  lastName = '';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  submitError = '';

  /** Handle submission */
  handleSubmit(){
    this.submitError = '';

    if (this.newPassword !== this.confirmPassword) {
      this.submitError = 'New passwords do not match.';
      return;
    }

    /** handle password verification + change new password */

    /* Need to actually update the user profile*/
    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      imgFile: this.imageFile
    }
  }

  /** File Uploading */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => (this.imagePreviewUrl = e.target?.result as string);
    reader.readAsDataURL(file);
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  /** Display current user variables */
  displayFirstName = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return '';
    return user.first_name;
  });

  displayLastName = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return '';
    return user.last_name;
  });

  displayEmail = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return '';
    else return user.email;
  });

  avatarUrl = computed(() => {
    return this.auth.currentUser()?.profile_picture ?? 'profileimg.png';
  });
  
  displayUsername = computed(() =>{
    const user = this.auth.currentUser();
    if (!user) return '';
    const username = `${user.username}`.trim();
    return username;
  });
}
