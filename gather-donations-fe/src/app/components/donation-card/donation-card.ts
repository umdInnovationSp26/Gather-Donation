import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Donation } from '../../models/donation.model';

@Component({
  selector: 'app-donation-card',
  standalone: true,
  imports: [],
  templateUrl: './donation-card.html',
  styleUrl: './donation-card.css',
})
export class DonationCard {
  @Input() donation!: Donation;
  @Output() viewDetails = new EventEmitter<Donation>();

  onViewDetails(): void {
    this.viewDetails.emit(this.donation);
  }
}
