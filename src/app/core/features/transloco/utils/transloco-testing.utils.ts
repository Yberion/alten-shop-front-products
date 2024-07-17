import type { ModuleWithProviders } from '@angular/core';
import type { TranslocoTestingOptions } from '@jsverse/transloco';
import { TranslocoTestingModule } from '@jsverse/transloco';

export function getTranslocoTestingModule(langs: TranslocoTestingOptions['langs']): ModuleWithProviders<TranslocoTestingModule> {
  return TranslocoTestingModule.forRoot({
    langs: langs,
    // Comment this for now as we don't want text to be translated in the Unit Tests
    // we just want the keys
    /*
    translocoConfig: {
      availableLangs: AVAILABLE_LANGS,
      defaultLang: AVAILABLE_LANGS[0],
    },
    */
    preloadLangs: false,
  });
}
