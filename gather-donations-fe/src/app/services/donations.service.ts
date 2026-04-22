import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category, DonationItem } from '../models/donation.model';

@Injectable({ providedIn: 'root' })
export class DonationsService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/donations`;

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.base}/categories/`);
  }

  getItems(filters?: { category?: number; status?: string; search?: string }): Observable<DonationItem[]> {
    let params = new HttpParams();
    if (filters?.category) params = params.set('category', filters.category);
    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.search) params = params.set('search', filters.search);
    return this.http.get<DonationItem[]>(`${this.base}/items/`, { params });
  }

  getItem(id: number): Observable<DonationItem> {
    return this.http.get<DonationItem>(`${this.base}/items/${id}/`);
  }

  createItem(data: FormData): Observable<DonationItem> {
    return this.http.post<DonationItem>(`${this.base}/items/`, data);
  }

  updateItem(id: number, data: Partial<DonationItem>): Observable<DonationItem> {
    return this.http.patch<DonationItem>(`${this.base}/items/${id}/`, data);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/items/${id}/`);
  }
}
