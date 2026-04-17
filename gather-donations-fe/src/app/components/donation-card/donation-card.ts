import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DonationItem } from '../../models/donation.model';

@Component({
  selector: 'app-donation-card',
  standalone: true,
  imports: [],
  templateUrl: './donation-card.html',
  styleUrl: './donation-card.css',
})
export class DonationCard {
  @Input() donation!: DonationItem;
  @Output() viewDetails = new EventEmitter<DonationItem>();

  onViewDetails(): void {
    this.viewDetails.emit(this.donation);
  }
}
