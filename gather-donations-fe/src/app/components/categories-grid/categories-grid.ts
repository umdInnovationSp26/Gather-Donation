import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CategoryCard } from '../category-card/category-card';
import { DonationsService } from '../../services/donations.service';

interface UiCategory {
  id: number | 'all';
  label: string;
}

const ALL_CATEGORY: UiCategory = { id: 'all', label: 'View All' };

@Component({
  selector: 'app-categories-grid',
  standalone: true,
  imports: [CategoryCard],
  templateUrl: './categories-grid.html',
  styleUrl: './categories-grid.css',
})
export class CategoriesGrid implements OnInit {
  private donationsService = inject(DonationsService);

  @Input() selectedCategory: number | 'all' = 'all';
  @Output() categoryChange = new EventEmitter<number | 'all'>();

  categories: UiCategory[] = [ALL_CATEGORY];

  ngOnInit(): void {
    this.donationsService.getCategories().subscribe({
      next: cats => {
        this.categories = [ALL_CATEGORY, ...cats.map(c => ({ id: c.id as number | 'all', label: c.name }))];
      },
    });
  }

  select(id: number | 'all'): void {
    this.categoryChange.emit(id);
  }
}
