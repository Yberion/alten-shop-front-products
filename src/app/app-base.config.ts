import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LOCALE_ID, type ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { appRoutes } from './app.routes';

export const appBaseConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: LOCALE_ID, useValue: 'en' },
    MessageService,
  ],
};
