import { Component, Input } from '@angular/core';
import { BalancePanel } from '../balance-panel/balance-panel';
import { ResourcesPanel, Resource } from '../resources-panel/resources-panel';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [BalancePanel, ResourcesPanel],
  templateUrl: './right-panel.html',
  styleUrl: './right-panel.css',
})
export class RightPanel {
  @Input() balance = 0;
  @Input() resources: Resource[] = [];
}
