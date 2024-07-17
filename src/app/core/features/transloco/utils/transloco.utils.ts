import type { Translation } from '@jsverse/transloco';

export const AVAILABLE_LANGS = ['en', 'fr'];

export type TranslocoImporter = (lang: string, root: string) => Promise<Translation>;

export const scopeLoader = (importer: TranslocoImporter, root = 'i18n'): Translation => {
  return AVAILABLE_LANGS.reduce((accumulator: Translation, lang: string): Translation => {
    accumulator[lang] = (): Promise<Translation> => importer(lang, root);
    return accumulator;
  }, {} as Translation);
};