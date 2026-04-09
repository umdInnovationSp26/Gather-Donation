import { Component, Input } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { CategoriesGrid } from '../categories-grid/categories-grid';
import { RightPanel } from '../right-panel/right-panel';
import { DonationsGrid } from '../donations-grid/donations-grid';
import { DonationDetailModal } from '../donation-detail-modal/donation-detail-modal';
import { Donation, MOCK_DONATIONS } from '../../models/donation.model';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [SearchBar, CategoriesGrid, RightPanel, DonationsGrid, DonationDetailModal],
  templateUrl: './home-content.html',
  styleUrl: './home-content.css',
})
export class HomeContent {
  @Input() balance = 32;

  selectedCategory = 'all';
  donations: Donation[] = MOCK_DONATIONS;
  selectedDonation: Donation | null = null;

  onSearch(query: string): void {
    console.log('Search query:', query);
  }

  onCategoryChange(categoryId: string): void {
    this.selectedCategory = categoryId;
  }

  onViewDetails(donation: Donation): void {
    this.selectedDonation = donation;
  }

  onCloseModal(): void {
    this.selectedDonation = null;
  }
}
