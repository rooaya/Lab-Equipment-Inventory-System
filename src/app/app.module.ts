import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AllUsersComponent } from './features/admin-pages/all-users/all-users.component';
import { ProfileComponent } from './features/admin-pages/profile/profile.component';
import { HomeComponent } from './features/user-pages/home/home.component';
import { UserProfileComponent } from './features/user-pages/profile/profile.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { RequestsComponent } from './features/admin-pages/requests/requests.component';
import { DashboardComponent } from './features/admin-pages/dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AllUsersComponent,
    ProfileComponent,
    HomeComponent,
    UserProfileComponent,
    DialogComponent,
    RequestsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
