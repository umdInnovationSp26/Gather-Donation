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

  displayName = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return '';
    const full = `${user.first_name} ${user.last_name}`.trim();
    return full || user.email;
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
    const username = `@${user.username}`.trim();
    return username;
  });
}
