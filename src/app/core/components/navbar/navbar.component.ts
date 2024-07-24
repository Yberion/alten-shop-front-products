import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeToggleButtonComponent } from './components/theme-toggle-button/theme-toggle-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, ThemeToggleButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
