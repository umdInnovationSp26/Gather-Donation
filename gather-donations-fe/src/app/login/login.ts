import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent { 
  
  constructor(private router: Router) {} 

  handleLogin() {
    console.log("Redirecting to home...");
    this.router.navigate(['/home']); // go to /home
  }
}