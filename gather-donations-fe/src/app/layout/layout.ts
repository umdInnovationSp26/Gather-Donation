import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private auth = inject(AuthService);

  displayName = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return '';
    const full = `${user.first_name} ${user.last_name}`.trim();
    return full || user.email;
  });

  avatarUrl = computed(() => {
    return this.auth.currentUser()?.profile_picture ?? 'profileimg.png';
  });

  logout(): void {
    this.auth.logout();
  }
}
