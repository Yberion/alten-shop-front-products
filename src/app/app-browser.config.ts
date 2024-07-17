import { mergeApplicationConfig, type ApplicationConfig } from '@angular/core';
import { appBaseConfig } from './app-base.config';

const config: ApplicationConfig = {
  providers: [],
};

export const appBrowserConfig = mergeApplicationConfig(appBaseConfig, config);
