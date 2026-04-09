import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CategoryCard } from '../category-card/category-card';

export interface Category {
  id: string;
  label: string;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'all', label: 'View All' },
  { id: 'cleaning', label: 'Cleaning' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'clothing', label: 'Clothing' },
];

@Component({
  selector: 'app-categories-grid',
  standalone: true,
  imports: [CategoryCard],
  templateUrl: './categories-grid.html',
  styleUrl: './categories-grid.css',
})
export class CategoriesGrid {
  @Input() categories: Category[] = DEFAULT_CATEGORIES;
  @Input() selectedCategory = 'all';
  @Output() categoryChange = new EventEmitter<string>();

  select(id: string): void {
    this.categoryChange.emit(id);
  }
}
