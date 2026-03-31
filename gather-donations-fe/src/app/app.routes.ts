import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Home } from './pages/home/home';


export const routes: Routes = [
  // 1. Send to login after web app starts
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // 2. Login route
  { path: 'login', component: LoginComponent },
  
  // 3. Home route
  { path: 'home', component: Home }
];