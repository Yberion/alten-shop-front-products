import { mergeApplicationConfig, type ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appBaseConfig } from './app-base.config';

const config: ApplicationConfig = {
  providers: [provideAnimationsAsync()],
};

export const appBrowserConfig = mergeApplicationConfig(appBaseConfig, config);
