import { Routes } from '@angular/router';
import { Login } from './auth/login/login/login';
import { Register } from './auth/register/register/register';
import { MyApplications } from './applications/my-applications/my-applications/my-applications';
import { PostJob } from './jobs/post-job/post-job/post-job';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'post-job', component: PostJob },
  { path: 'applications', component: MyApplications },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
