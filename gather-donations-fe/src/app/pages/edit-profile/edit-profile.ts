import { Component, Input, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  imports: [RouterLink],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {

  private auth = inject(AuthService);

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
