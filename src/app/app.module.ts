import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DashboardComponent } from './features/admin-pages/dashboard/dashboard.component';
import { Equipment } from './core/models/equipment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AllUsersComponent } from './features/admin-pages/all-users/all-users.component';
import { AppbarComponent } from './shared/components/appbar/appbar.component';
import { ProfileComponent } from './features/admin-pages/profile/profile.component';
import { HomeComponent } from './features/user-pages/home/home.component';
import { UserProfileComponent } from './features/user-pages/profile/profile.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { RequestsComponent } from './features/admin-pages/requests/requests.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    AllUsersComponent,
    AppbarComponent,
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
    CommonModule,
    BrowserModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
