import { Component, inject, computed } from '@angular/core';
import { BalancePanel } from '../balance-panel/balance-panel';
import { ResourcesPanel } from '../resources-panel/resources-panel';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [BalancePanel, ResourcesPanel],
  templateUrl: './right-panel.html',
  styleUrl: './right-panel.css',
})
export class RightPanel {
  private authService = inject(AuthService);

  // Read token_balance reactively from the current user signal
  balance = computed(() => this.authService.currentUser()?.token_balance ?? 0);

  resources = [
    // keep whatever resources were already here
  ];
}