import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-balance-panel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './balance-panel.html',
  styleUrl: './balance-panel.css',
})
export class BalancePanel {
  @Input() balance = 0;
}
