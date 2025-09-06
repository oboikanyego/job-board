import { Routes } from '@angular/router';
import { Login } from './auth/login/login/login';
import { Register } from './auth/register/register/register';
import { MyApplications } from './applications/my-applications/my-applications/my-applications';
import { PostJob } from './jobs/post-job/post-job/post-job';
import { JobList } from './jobs/job-list/job-list/job-list';
import { JobDetail } from './jobs/job-detail/job-detail/job-detail';
import { routesAuthGuard } from './routes-auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', canActivate: [routesAuthGuard], component: Register },
  { path: 'post-job', canActivate: [routesAuthGuard], component: PostJob },
  { path: 'applications', canActivate: [routesAuthGuard], component: MyApplications },
  { path: 'jobs', canActivate: [routesAuthGuard], component: JobList },
  { path: 'job/:id', canActivate: [routesAuthGuard], component: JobDetail },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
