import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LOCALE_ID, provideZoneChangeDetection, type ApplicationConfig } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { MessageService } from 'primeng/api';
import { appRoutes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';

export const appBaseConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withRouterConfig({ resolveNavigationPromiseOnError: true }),),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([errorInterceptor])),
    { provide: LOCALE_ID, useValue: 'en' },
    MessageService,
  ],
};
