import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  email = '';
  username = '';
  firstName = '';
  lastName = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  isLoading = false;

  handleSignup() {
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.authService.register({
      email: this.email,
      username: this.username,
      first_name: this.firstName,
      last_name: this.lastName,
      password: this.password,
      password2: this.confirmPassword,
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.isLoading = false;
        const data = err.error;
        if (data && typeof data === 'object') {
          this.errorMessage = Object.values(data).flat().join(' ');
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      },
    });
  }

  handleGoogleSignup() {
    // Google OAuth not yet implemented
    alert('Google signup is not available yet.');
  }
}