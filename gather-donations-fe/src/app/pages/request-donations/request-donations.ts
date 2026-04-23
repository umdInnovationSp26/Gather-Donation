import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationsService } from '../../services/donations.service';
import { RequestsService } from '../../services/requests.service';
import { Category } from '../../models/donation.model';

@Component({
  selector: 'app-request-donations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-donations.html',
  styleUrl: './request-donations.css',
})
export class RequestDonations implements OnInit {
  private donationsService = inject(DonationsService);
  private requestsService = inject(RequestsService);
  private router = inject(Router);

  categories = signal<Category[]>([]);
  isSubmitting = signal(false);
  errorMessage = signal('');

  urgencyLevels = [
    { value: 'low', label: 'Low', desc: 'Within a month', color: '#48bb78' },
    { value: 'medium', label: 'Medium', desc: 'Within 2 weeks', color: '#ed8936' },
    { value: 'high', label: 'High', desc: 'Within a week', color: '#e53e3e' },
  ];

  formData = {
    title: '',
    categoryId: null as number | null,
    urgency: 'medium',
    quantity: 1,
    description: '',
    reason: '',
    deliveryPreference: 'pickup',
    address: '',
  };

  selectedCategoryName = computed(() => {
    const cat = this.categories().find((c) => c.id === this.formData.categoryId);
    return cat?.name ?? '';
  });

  ngOnInit(): void {
    this.donationsService.getCategories().subscribe({
      next: (cats) => this.categories.set(cats),
    });
  }

  onSubmit(): void {
    if (!this.formData.title.trim()) {
      this.errorMessage.set('Item name is required.');
      return;
    }

    // Build description combining all extra fields the backend model doesn't have
    const parts: string[] = [];
    if (this.formData.description.trim()) parts.push(this.formData.description.trim());
    if (this.formData.quantity > 1) parts.push(`Quantity needed: ${this.formData.quantity}`);
    if (this.formData.reason.trim()) parts.push(`Why I need this: ${this.formData.reason.trim()}`);
    parts.push(`Delivery preference: ${this.formData.deliveryPreference}`);
    const fullDescription = parts.join('\n\n') || 'No description provided.';

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.requestsService
      .createRequest({
        title: this.formData.title.trim(),
        description: fullDescription,
        category: this.formData.categoryId,
        urgency: this.formData.urgency as 'low' | 'medium' | 'high',
        location: this.formData.address.trim() || 'Not specified',
      })
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.router.navigate(['/active-requests']);
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.errorMessage.set('Failed to submit request. Please try again.');
          console.error(err);
        },
      });
  }
}
