import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DonationsService } from '../../services/donations.service';
import { RequestsService } from '../../services/requests.service';
import { AuthService } from '../../services/auth.service';
import { DonationItem, DonationRequest } from '../../models/donation.model';

type UiStatus = 'active' | 'pending' | 'fulfilled' | 'expired';

interface ActiveDonation {
  id: number;
  title: string;
  categoryName: string;
  imageUrl: string | null;
  status: UiStatus;
  postedDate: string;
  tokenValue: number;
}

interface ActiveRequest {
  id: number;
  title: string;
  categoryName: string;
  urgency: string;
  status: UiStatus;
  postedDate: string;
  tokenValue: number;
}

@Component({
  selector: 'app-active-requests',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './active-requests.html',
  styleUrl: './active-requests.css',
})
export class ActiveRequests implements OnInit {
  private donationsService = inject(DonationsService);
  private requestsService = inject(RequestsService);
  private authService = inject(AuthService);

  activeTab: 'donations' | 'requests' = 'donations';
  isLoading = signal(true);

  myDonations = signal<ActiveDonation[]>([]);
  myRequests = signal<ActiveRequest[]>([]);

  stats = computed(() => {
    const d = this.myDonations();
    const r = this.myRequests();
    return {
      activeDonations: d.filter((i) => i.status === 'active').length,
      pendingDonations: d.filter((i) => i.status === 'pending').length,
      fulfilledDonations: d.filter((i) => i.status === 'fulfilled').length,
      activeRequests: r.filter((i) => i.status === 'active').length,
      pendingRequests: r.filter((i) => i.status === 'pending').length,
      fulfilledRequests: r.filter((i) => i.status === 'fulfilled').length,
    };
  });

  private loadCount = 0;

  ngOnInit(): void {
    const userId = this.authService.currentUser()?.id;

    this.donationsService.getItems().subscribe({
      next: (items) => {
        const mine = userId ? items.filter((i) => i.donor === userId) : items;
        this.myDonations.set(mine.map(this.toDonationUi));
        this.onLoaded();
      },
      error: () => this.onLoaded(),
    });

    this.requestsService.getRequests().subscribe({
      next: (reqs) => {
        const mine = userId ? reqs.filter((r) => r.requester === userId) : reqs;
        this.myRequests.set(mine.map(this.toRequestUi));
        this.onLoaded();
      },
      error: () => this.onLoaded(),
    });
  }

  confirmPickup(id: number): void {
    this.donationsService.updateItem(id, { status: 'donated' }).subscribe({
      next: (updated) => {
        this.myDonations.update((list) =>
          list.map((d) => (d.id === id ? { ...d, status: this.mapDonationStatus(updated.status) } : d))
        );
      },
    });
  }

  cancelDonation(id: number): void {
    this.donationsService.deleteItem(id).subscribe({
      next: () => this.myDonations.update((list) => list.filter((d) => d.id !== id)),
    });
  }

  cancelRequest(id: number): void {
    this.requestsService.updateRequest(id, { status: 'cancelled' }).subscribe({
      next: (updated) => {
        this.myRequests.update((list) =>
          list.map((r) => (r.id === id ? { ...r, status: this.mapRequestStatus(updated.status) } : r))
        );
      },
    });
  }

  private onLoaded(): void {
    this.loadCount++;
    if (this.loadCount >= 2) this.isLoading.set(false);
  }

  private toDonationUi = (item: DonationItem): ActiveDonation => ({
    id: item.id,
    title: item.title,
    categoryName: item.category_name,
    imageUrl: item.image,
    status: this.mapDonationStatus(item.status),
    postedDate: item.created_at.split('T')[0],
    tokenValue: 5,
  });

  private toRequestUi = (req: DonationRequest): ActiveRequest => ({
    id: req.id,
    title: req.title,
    categoryName: req.category_name,
    urgency: req.urgency,
    status: this.mapRequestStatus(req.status),
    postedDate: req.created_at.split('T')[0],
    tokenValue: 3,
  });

  private mapDonationStatus(status: string): UiStatus {
    switch (status) {
      case 'available': return 'active';
      case 'reserved':  return 'pending';
      case 'donated':   return 'fulfilled';
      default:          return 'expired';
    }
  }

  private mapRequestStatus(status: string): UiStatus {
    switch (status) {
      case 'open':      return 'active';
      case 'fulfilled': return 'fulfilled';
      default:          return 'expired';
    }
  }
}