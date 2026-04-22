import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RequestsService } from '../../services/requests.service';
import { DonationRequest } from '../../models/donation.model';

@Component({
  selector: 'app-active-requests',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './active-requests.html',
  styleUrl: './active-requests.css',
})
export class ActiveRequests implements OnInit {
  private requestsService = inject(RequestsService);

  requests: DonationRequest[] = [];
  isLoading = true;
  error = '';

  // Pagination
  currentPage = 1;
  pageSize = 6;

  get paginated(): DonationRequest[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.requests.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.requests.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit(): void {
    this.requestsService.getRequests({ status: 'open' }).subscribe({
      next: (data) => {
        this.requests = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load active requests.';
        this.isLoading = false;
      },
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}