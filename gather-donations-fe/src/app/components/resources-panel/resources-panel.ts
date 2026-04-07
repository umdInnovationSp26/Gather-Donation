import { Component, Input } from '@angular/core';

export interface Resource {
  id: string;
  name: string;
}

const DEFAULT_RESOURCES: Resource[] = [
  { id: '1', name: 'Family Freedom Center' },
  { id: '2', name: 'Damiano Center' },
  { id: '3', name: 'Community Action Duluth' },
  { id: '4', name: 'CHUM' },
];

@Component({
  selector: 'app-resources-panel',
  standalone: true,
  imports: [],
  templateUrl: './resources-panel.html',
  styleUrl: './resources-panel.css',
})
export class ResourcesPanel {
  @Input() resources: Resource[] = DEFAULT_RESOURCES;
}
