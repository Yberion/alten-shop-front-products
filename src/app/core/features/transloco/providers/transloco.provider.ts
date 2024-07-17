import type { EnvironmentProviders } from '@angular/core';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoaderService } from '../services/transloco-loader.service';
import { AVAILABLE_LANGS } from '../utils/transloco.utils';

export function provideTranslocoSetup(): EnvironmentProviders[] {
  return provideTransloco({
    config: {
      availableLangs: AVAILABLE_LANGS,
      defaultLang: AVAILABLE_LANGS[0],
      fallbackLang: AVAILABLE_LANGS[0],
      // Remove this option if your application doesn't support changing language in runtime.
      reRenderOnLangChange: true,
      prodMode: !isDevMode(),
      //missingHandler: {
      //  useFallbackTranslation: true,
      //},
    },
    loader: TranslocoHttpLoaderService,
  });
}
