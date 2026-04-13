import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink], // RouterLink lets us go back to Login
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  private router = inject(Router);

  email = '';
  password = '';
  confirmPassword = '';

  handleSignup() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    // For prototype: simulate successful registration
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/home']);
  }

  handleGoogleSignup() {
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/home']);
  }
}