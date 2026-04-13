import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink], 
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private router = inject(Router);
  email = '';
  password = '';

  handleLogin() {
    
    if (this.email && this.password) {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/home']);
    }
  }

  handleGoogleLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/home']);
  }

  handleGuestLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/home']);
  }
}