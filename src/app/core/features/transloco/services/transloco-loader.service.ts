import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Translation, TranslocoLoader } from '@jsverse/transloco';
import type { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoaderService implements TranslocoLoader {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getTranslation(lang: string): Observable<Translation> {
    return this.httpClient.get<Translation>(`/i18n/core/${lang}.json`);
  }
}
