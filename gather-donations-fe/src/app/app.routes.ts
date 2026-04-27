import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Layout } from './layout/layout';
import { authGuard } from './auth-guard';


import { Home } from './pages/home/home';
import { PostDonations } from './pages/post-donations/post-donations';
import { RequestDonations } from './pages/request-donations/request-donations';
import { Volunteer } from './pages/volunteer/volunteer';
import { ActiveRequests } from './pages/active-requests/active-requests';
import { Profile } from './pages/profile/profile';
import { SignupComponent } from './signup/signup';
import { EditProfile } from './pages/edit-profile/edit-profile';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }, // Add this line!
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'post-donations', component: PostDonations },
      { path: 'request-donations', component: RequestDonations },
      { path: 'volunteer', component: Volunteer },
      { path: 'active-requests', component: ActiveRequests },
      { path: 'profile', component: Profile },
      { path: 'edit-profile', component: EditProfile},
    ]
  },
  { path: '**', redirectTo: 'login' }
];