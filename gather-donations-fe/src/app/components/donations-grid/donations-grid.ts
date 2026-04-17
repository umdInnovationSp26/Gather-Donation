import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DonationItem } from '../../models/donation.model';
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
  @Input() donations: DonationItem[] = [];
  @Input() isLoading = false;
  @Output() viewDetails = new EventEmitter<DonationItem>();

  currentPage = 1;
  pageSize = PAGE_SIZE;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.donations.length / this.pageSize));
  }

  get paginated(): DonationItem[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.donations.slice(start, start + this.pageSize);
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

  onViewDetails(donation: DonationItem): void {
    this.viewDetails.emit(donation);
  }
}
