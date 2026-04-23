import { Component, ElementRef, ViewChild, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationsService } from '../../services/donations.service';
import { Category } from '../../models/donation.model';

const CONDITION_MAP: Record<string, string> = {
  'New':       'new',
  'Like New':  'like_new',
  'Good':      'good',
  'Fair':      'fair',
  'Worn':      'poor',
};

@Component({
  selector: 'app-post-donations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-donations.html',
  styleUrl: './post-donations.css',
})
export class PostDonations implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private donationsService = inject(DonationsService);
  private router = inject(Router);

  categories = signal<Category[]>([]);
  isSubmitting = signal(false);
  errorMessage = signal('');

  imageFile: File | null = null;
  imagePreviewUrl: string | null = null;

  conditions = ['New', 'Like New', 'Good', 'Fair', 'Worn'];
  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  formData = {
    title: '',
    categoryId: null as number | null,
    condition: '',
    quantity: 1,
    description: '',
    pickupAddress: '',
    availableDays: [] as string[],
    notes: '',
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => (this.imagePreviewUrl = e.target?.result as string);
    reader.readAsDataURL(file);
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  toggleDay(day: string): void {
    const idx = this.formData.availableDays.indexOf(day);
    if (idx > -1) {
      this.formData.availableDays.splice(idx, 1);
    } else {
      this.formData.availableDays.push(day);
    }
  }

  isDaySelected(day: string): boolean {
    return this.formData.availableDays.includes(day);
  }

  onSubmit(): void {
    if (!this.formData.title.trim()) {
      this.errorMessage.set('Item name is required.');
      return;
    }
    if (!this.formData.condition) {
      this.errorMessage.set('Please select a condition.');
      return;
    }

    // Build description combining extra fields the backend model doesn't have
    const parts: string[] = [];
    if (this.formData.description.trim()) parts.push(this.formData.description.trim());
    if (this.formData.quantity > 1) parts.push(`Quantity: ${this.formData.quantity}`);
    if (this.formData.availableDays.length) parts.push(`Available days: ${this.formData.availableDays.join(', ')}`);
    if (this.formData.notes.trim()) parts.push(`Notes: ${this.formData.notes.trim()}`);
    const fullDescription = parts.join('\n\n') || 'No description provided.';

    const payload = new FormData();
    payload.append('title', this.formData.title.trim());
    payload.append('description', fullDescription);
    payload.append('condition', CONDITION_MAP[this.formData.condition] ?? 'good');
    payload.append('location', this.formData.pickupAddress.trim() || 'Not specified');
    if (this.formData.categoryId !== null) {
      payload.append('category', String(this.formData.categoryId));
    }
    if (this.imageFile) {
      payload.append('image', this.imageFile, this.imageFile.name);
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.donationsService.createItem(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/active-requests']);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set('Failed to post donation. Please try again.');
        console.error(err);
      },
    });
  }
}
