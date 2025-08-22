import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

  bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([new AuthInterceptor().intercept]))
  ]
});
