import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DonationItem } from '../../models/donation.model';

@Component({
  selector: 'app-donation-detail-modal',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './donation-detail-modal.html',
  styleUrl: './donation-detail-modal.css',
})
export class DonationDetailModal {
  @Input() donation: DonationItem | null = null;
  @Output() close = new EventEmitter<void>();

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
