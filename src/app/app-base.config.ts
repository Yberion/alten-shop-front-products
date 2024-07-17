import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LOCALE_ID, type ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { appRoutes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';

export const appBaseConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    { provide: LOCALE_ID, useValue: 'en' },
    MessageService,
  ],
};
