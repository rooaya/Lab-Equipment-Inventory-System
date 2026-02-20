import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/admin-pages/dashboard/dashboard.component';
import { AllUsersComponent } from './features/admin-pages/all-users/all-users.component';
import { ProfileComponent } from './features/admin-pages/profile/profile.component';
import { HomeComponent } from './features/user-pages/home/home.component';
import { UserProfileComponent } from './features/user-pages/profile/profile.component';
import { RequestsComponent } from './features/admin-pages/requests/requests.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guarde/auth.guard';
import { SignupComponent } from './features/auth/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // User routes (accessible to regular users)
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'Admin' }
  },
  {
    path: 'user',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { role: 'User' }
  },
  {
    path: 'home', component: HomeComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: AllUsersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add', component: RequestsComponent },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard], data: { role: 'Admin' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
