import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
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
export class NavbarComponent {
  public userMenuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-fw pi-cog', routerLink: '/user/profile' },
    {
      label: 'Messages',
      icon: 'pi pi-fw pi-envelope',
      routerLink: '/user/messages',
    },
    {
      label: 'Notifications',
      icon: 'pi pi-fw pi-bell',
      routerLink: '/user/notifications',
    },
    { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: undefined },
  ];
}
