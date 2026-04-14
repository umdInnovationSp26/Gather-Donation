import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private router = inject(Router);
  private auth = inject(AuthService);

  email = '';
  password = '';
  errorMessage = signal('');
  isLoading = signal(false);

  handleLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage.set('Please enter your email and password.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => {
        this.errorMessage.set('Invalid email or password. Please try again.');
        this.isLoading.set(false);
      },
    });
  }

  handleGuestLogin(): void {
    this.router.navigate(['/home']);
  }
}
