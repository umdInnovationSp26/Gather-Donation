import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Home } from './pages/home/home';
import { ActiveRequests } from './pages/active-requests/active-requests';
import { PostDonations } from './pages/post-donations/post-donations';
import { RequestDonations } from './pages/request-donations/request-donations';
import { Volunteer } from './pages/volunteer/volunteer';


export const routes: Routes = [
  // 1. Send to login after web app starts
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // 2. Login route
  { path: 'login', component: LoginComponent },
  
  // 3. Home route
  { path: 'home', component: Home },
  
  // 4. Active Requests route
  { path: 'active-requests', component: ActiveRequests },

  // 5. Post Donations route
  { path: 'post-donations', component: PostDonations },

  // 6. Request Donations route
  { path: 'request-donations', component: RequestDonations },

  // 7. Volunteer route
  { path: 'volunteer', component: Volunteer }
];