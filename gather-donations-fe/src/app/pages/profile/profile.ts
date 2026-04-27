import { Component, Input, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BalancePanel } from '../../components/balance-panel/balance-panel';
import { AuthService } from '../../services/auth.service';
import { ActiveRequests } from '../active-requests/active-requests';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, BalancePanel, ActiveRequests],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  @Input() balance = 0;

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
