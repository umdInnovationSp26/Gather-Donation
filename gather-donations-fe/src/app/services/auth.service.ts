import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthTokens, LoginPayload, RegisterPayload, User } from '../models/donation.model';

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private base = `${environment.apiUrl}/auth`;

  currentUser = signal<User | null>(this.loadUser());
  isGuest = signal<boolean>(false);

  loginAsGuest(): void {
    this.isGuest.set(true);
  }

  login(payload: LoginPayload): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.base}/login/`, payload).pipe(tap(res => this.storeSession(res)));
  }

  register(payload: RegisterPayload): Observable<User> {
    return this.http.post<User>(`${this.base}/register/`, payload);
  }

  refreshToken(): Observable<{ access: string }> {
    const refresh = localStorage.getItem(REFRESH_KEY);
    return this.http
      .post<{ access: string }>(`${this.base}/token/refresh/`, { refresh })
      .pipe(tap(res => localStorage.setItem(ACCESS_KEY, res.access)));
  }

  logout(): void {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem('current_user');
    this.currentUser.set(null);
    this.isGuest.set(false);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  private storeSession(res: AuthTokens): void {
    localStorage.setItem(ACCESS_KEY, res.access);
    localStorage.setItem(REFRESH_KEY, res.refresh);
    localStorage.setItem('current_user', JSON.stringify(res.user));
    this.currentUser.set(res.user);
  }

  private loadUser(): User | null {
    const raw = localStorage.getItem('current_user');
    return raw ? (JSON.parse(raw) as User) : null;
  }
}
