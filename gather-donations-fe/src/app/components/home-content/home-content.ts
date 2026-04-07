import { Component, Input } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { CategoriesGrid } from '../categories-grid/categories-grid';
import { RightPanel } from '../right-panel/right-panel';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [SearchBar, CategoriesGrid, RightPanel],
  templateUrl: './home-content.html',
  styleUrl: './home-content.css',
})
export class HomeContent {
  @Input() balance = 32;

  onSearch(query: string): void {
    // Wire up to a search service later
    console.log('Search query:', query);
  }
}
