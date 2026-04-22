import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DonationRequest } from '../models/donation.model';

@Injectable({ providedIn: 'root' })
export class RequestsService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/donations`;

  getRequests(filters?: {
    category?: number;
    urgency?: string;
    status?: string;
    search?: string;
  }): Observable<DonationRequest[]> {
    let params = new HttpParams();
    if (filters?.category) params = params.set('category', filters.category);
    if (filters?.urgency) params = params.set('urgency', filters.urgency);
    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.search) params = params.set('search', filters.search);
    return this.http.get<DonationRequest[]>(`${this.base}/requests/`, { params });
  }

  getRequest(id: number): Observable<DonationRequest> {
    return this.http.get<DonationRequest>(`${this.base}/requests/${id}/`);
  }

  createRequest(data: Partial<DonationRequest>): Observable<DonationRequest> {
    return this.http.post<DonationRequest>(`${this.base}/requests/`, data);
  }

  updateRequest(id: number, data: Partial<DonationRequest>): Observable<DonationRequest> {
    return this.http.patch<DonationRequest>(`${this.base}/requests/${id}/`, data);
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/requests/${id}/`);
  }
}
