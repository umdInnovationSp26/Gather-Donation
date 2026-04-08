import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Layout } from './layout/layout';
import { Home } from './pages/home/home';
import { ActiveRequests } from './pages/active-requests/active-requests';
import { PostDonations } from './pages/post-donations/post-donations';
import { RequestDonations } from './pages/request-donations/request-donations';
import { Volunteer } from './pages/volunteer/volunteer';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  // Default: redirect to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login: no layout shell
  { path: 'login', component: LoginComponent },

  // Authenticated pages: wrapped in the layout shell (topbar + sidebar)
  {
    path: '',
    component: Layout,
    children: [
      { path: 'home', component: Home },
      { path: 'post-donations', component: PostDonations },
      { path: 'request-donations', component: RequestDonations },
      { path: 'volunteer', component: Volunteer },
      { path: 'active-requests', component: ActiveRequests },
      { path: 'profile', component: Profile },
    ],
  },
];
