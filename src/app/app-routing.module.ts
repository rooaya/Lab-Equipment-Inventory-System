import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/admin-pages/dashboard/dashboard.component';
import { AllUsersComponent } from './features/admin-pages/all-users/all-users.component';
import { ProfileComponent } from './features/admin-pages/profile/profile.component';
import { HomeComponent } from './features/user-pages/home/home.component';
import { UserProfileComponent } from './features/user-pages/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: AllUsersComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
