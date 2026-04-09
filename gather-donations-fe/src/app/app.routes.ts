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


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
       
    ]
  },
  { path: '**', redirectTo: 'login' }
];