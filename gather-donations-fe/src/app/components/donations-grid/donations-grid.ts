import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Donation } from '../../models/donation.model';
import { DonationCard } from '../donation-card/donation-card';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-donations-grid',
  standalone: true,
  imports: [DonationCard],
  templateUrl: './donations-grid.html',
  styleUrl: './donations-grid.css',
})
export class DonationsGrid implements OnChanges {
  @Input() donations: Donation[] = [];
  @Input() selectedCategory = 'all';
  @Output() viewDetails = new EventEmitter<Donation>();

  currentPage = 1;
  pageSize = PAGE_SIZE;

  get filtered(): Donation[] {
    if (this.selectedCategory === 'all') return this.donations;
    return this.donations.filter(d => d.categoryId === this.selectedCategory);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
  }

  get paginated(): Donation[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnChanges(): void {
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onViewDetails(donation: Donation): void {
    this.viewDetails.emit(donation);
  }
}
