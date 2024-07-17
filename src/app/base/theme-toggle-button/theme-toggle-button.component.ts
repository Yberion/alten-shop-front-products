import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme-toggle-button',
  templateUrl: './theme-toggle-button.component.html',
  styleUrls: ['./theme-toggle-button.component.scss'],
  providers: [ThemeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleButtonComponent implements OnInit {
  public darkMode = false;

  constructor(private readonly themeService: ThemeService) {}

  ngOnInit(): void {
    // Set theme
    const storedTheme = localStorage.getItem('DWTheme');
    const theme: 'dark' | 'light' =
      storedTheme !== 'dark' && storedTheme !== 'light' ? 'light' : storedTheme;
    this.darkMode = theme === 'dark';
    this.setTheme(theme);
  }

  public toggleMode(): void {
    this.darkMode = !this.darkMode;
    const themeAttribute = this.darkMode ? 'dark' : 'light';
    this.setTheme(themeAttribute);
  }

  private setTheme(theme: 'dark' | 'light'): void {
    const documentTheme =
      document.documentElement.getAttribute('data-dark-mode');
    if (documentTheme !== theme) {
      document.documentElement.setAttribute('data-dark-mode', theme);
      this.themeService.switchTheme(theme);
      localStorage.setItem('DWTheme', theme);
    }
  }
}
