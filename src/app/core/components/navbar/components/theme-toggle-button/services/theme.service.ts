import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class ThemeService {
  private readonly document: Document = inject(DOCUMENT);

  public switchTheme(theme: 'dark' | 'light'): void {
    const themeLink = this.document.getElementById(
      'app-theme',
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = `mdc-${theme}-deeppurple.css`;
    }
  }
}
