import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BalancePanel } from '../../components/balance-panel/balance-panel';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, BalancePanel],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  @Input() balance = 32;
}
