import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-balance-panel',
  standalone: true,
  imports: [],
  templateUrl: './balance-panel.html',
  styleUrl: './balance-panel.css',
})
export class BalancePanel {
  @Input() balance = 0;
}
