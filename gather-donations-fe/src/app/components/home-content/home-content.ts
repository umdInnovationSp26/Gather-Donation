import { Component, OnInit, inject } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { CategoriesGrid } from '../categories-grid/categories-grid';
import { RightPanel } from '../right-panel/right-panel';
import { DonationsGrid } from '../donations-grid/donations-grid';
import { DonationDetailModal } from '../donation-detail-modal/donation-detail-modal';
import { DonationItem } from '../../models/donation.model';
import { DonationsService } from '../../services/donations.service';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [SearchBar, CategoriesGrid, RightPanel, DonationsGrid, DonationDetailModal],
  templateUrl: './home-content.html',
  styleUrl: './home-content.css',
})
export class HomeContent implements OnInit {
  private donationsService = inject(DonationsService);

  selectedCategory: number | 'all' = 'all';
  searchQuery = '';
  donations: DonationItem[] = [];
  selectedDonation: DonationItem | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.loadDonations();
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.loadDonations();
  }

  onCategoryChange(categoryId: number | 'all'): void {
    this.selectedCategory = categoryId;
    this.loadDonations();
  }

  onViewDetails(donation: DonationItem): void {
    this.selectedDonation = donation;
  }

  onCloseModal(): void {
    this.selectedDonation = null;
  }

  private loadDonations(): void {
    this.isLoading = true;
    this.donationsService
      .getItems({
        category: this.selectedCategory === 'all' ? undefined : this.selectedCategory,
        search: this.searchQuery || undefined,
        status: 'available',
      })
      .subscribe({
        next: items => {
          this.donations = items;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }
}
