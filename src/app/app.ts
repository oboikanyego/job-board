import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Auth } from './services/auth';
import { Common } from './services/common';
import { LoaderComponent } from './loader/loader-component/loader-component';

interface NavItem {
  label: string;
  path: string;
  roles: string[]; // which roles can see this
}
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    LoaderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('job-board');
  isUserAuthrized: boolean = false;
  userRole ="";

  navItems: NavItem[] =[]
  constructor(public commonService: Common,private authService: Auth) {
    this.isUserAuthrized = this.commonService.IsUserSignedIn;
    this.userRole =this.authService.role();
    this.navItems =  [
    { label: 'Applications', path: '/applications', roles: ['candidate'] },
    { label: 'Jobs', path: '/jobs', roles: ['employer'] },
    { label: 'Profile', path: '/results', roles: ['candidate', 'employer'] },
    { label: 'Subscription', path: '/reviews', roles: ['employer'] }
  ];
  }
}
