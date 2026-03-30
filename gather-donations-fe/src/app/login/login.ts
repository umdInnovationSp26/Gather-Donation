import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private router = inject(Router);
  
  email = '';
  password = '';

  // Firebase auth not working for now, fake login for testing purposes
  handleLogin() {
    if (this.email && this.password) {
      console.log("Mock Login Successful");
      this.router.navigate(['/home']);
    } else {
      alert("Please enter email and password (any will work for now!)");
    }
  }

  handleGuestLogin() {
    console.log("Mock Guest Login Successful");
    this.router.navigate(['/home']);
  }
}