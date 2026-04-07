import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  @Output() search = new EventEmitter<string>();

  query = '';

  onSearch(): void {
    this.search.emit(this.query.trim());
  }
}
